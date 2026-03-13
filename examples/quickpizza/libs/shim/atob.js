import { b64decode } from 'k6/encoding';
function atob(str) {
  return b64decode(str, 'std', 's');
}

global.atob = atob;
