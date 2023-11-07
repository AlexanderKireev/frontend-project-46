import parse from './parserFactory.js';

export default (fileData, ext) => parse(ext)(fileData);
