import * as fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import getDiff from './differ.js';
import getFormat from './formatters/index.js';
import parse from './parsers.js';

const readFile = (filePath) => {
  const absolutePath = path.resolve(cwd(), filePath);
  try {
    fs.accessSync(absolutePath, fs.constants.R_OK);
  } catch (err) {
    console.log(err.message);
  }
  return fs.readFileSync(absolutePath, 'utf-8');
};

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

const getParseData = (fileData, extention) => parse(extention)(fileData);

const genDiff = (file1, file2, format = 'stylish') => {
  const fileData1 = getParseData(readFile(file1), getFileExtension(file1));
  const fileData2 = getParseData(readFile(file2), getFileExtension(file2));

  const resultDiff = getDiff(fileData1, fileData2);

  return getFormat(format)(resultDiff);
};

export default genDiff;
