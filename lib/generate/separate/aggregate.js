const aid = require('../../aid');
const postman = require('postman-collection');

function aggregate(node) {
  return Collection(node);
}

function makeTree(name = null, auth = null) {
  return {
    name,
    auth,
    locations: [],
    group: { name: null, level: 0 },
    items: []
  };
}

function Collection(collection) {
  const tree = makeTree(null, collection.auth);
  const list = aid.spread(collection.items);
  List(list, tree);
  return tree;
}

function List(list, tree) {
  for (const member of list) {
    ListMember(member, tree);
  }
}

function ListMember(member, tree) {
  if (postman.ItemGroup.isItemGroup(member)) {
    ItemGroup(member, tree);
  } else if (postman.Item.isItem(member)) {
    Item(member, tree);
  } else {
    throw new Error('Unrecognized list member type');
  }
}

function ItemGroup(group, tree) {
  const result = makeTree(group.name || group.id, group.auth);
  result.group.name = group.name;

  // Calculate the depth level of the group
  let level = 1;
  group.forEachParent(parent => { level++; });
  result.group.level = level;

  const list = aid.spread(group.items);
  List(list, result);
  tree.locations.push(result);
}

function Item(item, tree) {
  tree.items.push(item);
}

module.exports = aggregate;
