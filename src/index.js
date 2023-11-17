import { getFileExtension, readFile, getParseData } from './fileUtils.js';
import getDiff from './differ.js';
import getFormat from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const fileData1 = getParseData(readFile(file1), getFileExtension(file1));
  const fileData2 = getParseData(readFile(file2), getFileExtension(file2));

  const resultDiff = getDiff(fileData1, fileData2);

  return getFormat(format)(resultDiff);
};

export default genDiff;
