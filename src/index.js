import { getFileExtension, readFile, getFileData } from './fileUtils.js';
import genDiff1 from './differ.js';

const genDiff = (file1, file2, format) => {
  // console.log(readFile(file1));
  // console.log(readFile(file2));

  // console.log(getFileExtension(file1));
  // console.log(getFileExtension(file2));

  const dict1 = getFileData(file1);
  const dict2 = getFileData(file2);
  const map = genDiff1(dict1, dict2);
  // console.log(map.common.values.setting6.values.doge);


  console.log(genDiff1(dict1, dict2));
  
  
  
  
  // console.log(getFileData(file1));
  
  return file1 + file2 + format;

};

export default genDiff;
