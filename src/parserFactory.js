import yaml from 'js-yaml';

const parse = (ext) => {
  switch (ext) {
    case 'json':
      return (data) => JSON.parse(data);
    case 'yml':
    case 'yaml':
      return (data) => yaml.load(data);
    default:
      throw new Error(`Unknown extention: '${ext}'!`);
  }
};

export default parse;
