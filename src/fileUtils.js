import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
// import parse from './parserFactory.js';

const readFile = (filePath) => {
  const absolutePath = path.resolve(cwd(), filePath);
  let fileData = null;
  try {
    fileData = readFileSync(absolutePath, 'utf-8');
  } catch {
    throw new Error(`File '${filePath}' not found!`);
    // console.error('file not found');
  }
  return fileData;
};

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

export { readFile, getFileExtension };
