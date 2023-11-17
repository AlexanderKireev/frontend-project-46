import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import parse from './parserFactory.js';

const readFile = (filePath) => {
  const absolutePath = path.resolve(cwd(), filePath);
  try {
    readFileSync(absolutePath, 'utf-8');
  } catch {
    throw new Error(`File '${filePath}' not found!`);
    // console.error('file not found');
  }
  const fileData = readFileSync(absolutePath, 'utf-8');
  return fileData;
};

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

const getParseData = (fileData, extention) => parse(extention)(fileData);

export { readFile, getFileExtension, getParseData };
