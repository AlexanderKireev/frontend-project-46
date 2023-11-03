import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';

const readFile = (filePath) => {
  const absolutePath = path.resolve(cwd(), filePath);
  // console.log(absolutePath);
  let fileData = null;
  try {
    fileData = readFileSync(absolutePath, 'utf-8');
  } catch {
    console.error('file not found');
  }
  return fileData;
};

const getFileExtension = (filePath) => {
  const ext = path.extname(filePath).slice(1);
  return ext;
};

const getFileData = (filePath) => {
  const mapData = JSON.parse(readFile(filePath));
  // for (const key of Object.values(mapData)) {
  //   console.log(key);
  // }
  return mapData;
};

// public static Map<String, Object> getData(String filePath) throws Exception {
//   byte[] mapData = readFile(filePath);
//   String fileType = getFileExtension(filePath);
//   return chooseParser(fileType).parse(mapData);

export { readFile, getFileExtension, getFileData };
