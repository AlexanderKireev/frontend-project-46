import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

let json1;
let json2;
let yaml;
let yml;
let expectedStylish;
let expectedPlain;
let expectedJson;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

  json1 = getFixturePath('file1.json');
  json2 = getFixturePath('file2.json');
  yaml = getFixturePath('file1.yaml');
  yml = getFixturePath('file2.yml');

  expectedStylish = readFile('expected_stylish.txt');
  expectedPlain = readFile('expected_plain.txt');
  expectedJson = readFile('expected_json.txt');
});

test('default (stylish) difference between two json files', () => {
  expect(genDiff(json1, json2)).toEqual(expectedStylish);
});

test('stylish difference between two yaml files', () => {
  expect(genDiff(yaml, yml, 'stylish')).toEqual(expectedStylish);
});

test('plain difference between two json files', () => {
  expect(genDiff(json1, json2, 'plain')).toEqual(expectedPlain);
});

test('json difference between two json files', () => {
  expect(genDiff(json1, json2, 'json')).toEqual(expectedJson);
});

test('test difference between missing files', () => {
  expect(() => { genDiff(json1, 'some_file2.json'); }).toThrowError();
});
