import getPlain from './plain.js';
import getStylish from './stylish.js';

const getFormat = (format) => {
  switch (format) {
    case 'stylish':
      return (obj) => getStylish(obj);
    case 'plain':
      return (obj) => getPlain(obj);
    case 'json':
      return (obj) => JSON.stringify(obj, ' ', 2);
    default:
      throw new Error(`unknown format: '${format}'`);
  }
};

export default getFormat;
