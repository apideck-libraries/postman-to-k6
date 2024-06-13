import Aws from '../../lib/auth/awsv4';

test('Should use service name if available', () => {
  const mockParams = {
    has: s => s === 'service',
    get: () => 'exampleParam',
  };

  const aws = new Aws({ parameters: () => mockParams }, {});
  expect(aws.getServiceName(mockParams)).toBe('service: "exampleParam"');
});

test('Should default to execute-api if service name is not available', () => {
  const mockParams = {
    has: () => false,
    get: () => 'exampleParam',
  };

  const aws = new Aws({ parameters: () => mockParams }, {});
  expect(aws.getServiceName(mockParams)).toBe('service: "execute-api"');
});
