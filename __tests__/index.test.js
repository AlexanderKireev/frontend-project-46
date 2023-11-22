import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe.each([['stylish'], ['plain'], ['json']])('%s formatter, difference between:', (formatter) => {
  const filepathOfExpected = getFixturePath(`${formatter}.txt`);
  const expected = readFileSync(filepathOfExpected, 'utf-8');

  test.each([['json'], ['yml']])('%s files', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);

    const result = genDiff(filepath1, filepath2, formatter);
    expect(result).toBe(expected);
  });
});

describe('return errors:', () => {
  test.each([
    ['no such file or directory', 'pdf', 'stylish'],
    ['unknown format', 'json', 'unkownformat'],
    ['unknown extention', 'txt', 'plain'],
  ])('%s', (expectedMessage, extension, formatter) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    try {
      genDiff(filepath1, filepath2, formatter);
    } catch (error) {
      expect(error.message).toContain(expectedMessage);
    }
  });
});
