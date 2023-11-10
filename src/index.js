import { getFileExtension, readFile } from './fileUtils.js';
import getParseData from './parsers.js';
import getDiff from './differ.js';
import getFormat from '../formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const fileData1 = readFile(file1);
  const fileData2 = readFile(file2);

  const ext1 = getFileExtension(file1);
  const ext2 = getFileExtension(file2);

  const dict1 = getParseData(fileData1, ext1);
  const dict2 = getParseData(fileData2, ext2);

  const map = getDiff(dict1, dict2);

  return getFormat(format)(map);
};

export default genDiff;
