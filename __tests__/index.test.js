import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yaml = getFixturePath('file1.yaml');
const yml = getFixturePath('file2.yml');
const txt = getFixturePath('text_file.txt');

const expectedStylish = readFile('expected_stylish.txt');
const expectedPlain = readFile('expected_plain.txt');
const expectedJson = readFile('expected_json.txt');

test('returns file not found error', () => {
  expect(() => { genDiff(json1, 'some_file2.json'); }).toThrow(new Error("File 'some_file2.json' not found!"));
});

test('returns unknown format error', () => {
  expect(() => { genDiff(json1, json2, 'txt'); }).toThrow(new Error("Unknown format: 'txt'!"));
});

test('returns unknown extention error', () => {
  expect(() => { genDiff(txt, json2); }).toThrow(new Error("Unknown extention: 'txt'!"));
});

test.each([
  ['json', json1, json2, expectedStylish],
  ['yaml', yaml, yml, expectedStylish],
])('default (stylish) difference between two %s files', (fileType, file1, file2, expected) => {
  expect(genDiff(file1, file2)).toEqual(expected);
});

test.each([
  ['json', 'stylish', json1, json2, expectedStylish],
  ['json', 'plain', json1, json2, expectedPlain],
  ['json', 'json', json1, json2, expectedJson],
  ['yaml', 'stylish', yaml, yml, expectedStylish],
  ['yaml', 'plain', yaml, yml, expectedPlain],
  ['yaml', 'json', yaml, yml, expectedJson],
])('difference between two %s files in %s format', (fileType, format, file1, file2, expected) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
