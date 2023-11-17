import _ from 'lodash';

const fourSteps = 4;
const twoSteps = 2;
const none = ' ';
const add = '+ ';
const del = '- ';
const brace1 = '{';
const brace2 = '}';
const colon = ':';

const getConcatString = (string, count, key, operand, value) => string
  .concat(`${none.repeat(count)}${operand}${key}${colon}${none}${value}\n`);

const convObjToString = (obj, spaseCount) => Object.entries(obj)
  .reduce((string, [key, value]) => string
    .concat(`\n${none.repeat(spaseCount + fourSteps * twoSteps)}${key}: `)
    .concat(_.isObject(value) ? `${convObjToString(value, spaseCount + fourSteps)}`
      : `${value}`), brace1).concat(`\n${none.repeat(spaseCount + fourSteps)}${brace2}`);

const getStylish = (obj, spaseCount = 0) => Object.entries(obj).reduce((str, [key, value]) => {
  const {
    status, value1, value2, values,
  } = value;

  const oldValue = _.isObject(value1) ? convObjToString(value1, spaseCount) : value1;
  const newValue = _.isObject(value2) ? convObjToString(value2, spaseCount) : value2;

  switch (status) {
    case 'unchanged':
      return getConcatString(str, spaseCount + twoSteps, key, none.repeat(twoSteps), oldValue);
    case 'changed':
      return getConcatString(str, spaseCount + twoSteps, key, del, oldValue)
        .concat(getConcatString('', spaseCount + twoSteps, key, add, newValue));
    case 'added':
      return getConcatString(str, spaseCount + twoSteps, key, add, newValue);
    case 'deleted':
      return getConcatString(str, spaseCount + twoSteps, key, del, oldValue);
    case 'notplain':
      return str.concat(`${none.repeat(spaseCount + fourSteps)}${key}: `)
        .concat(getStylish(values, spaseCount + fourSteps)).concat('\n');
    default:
      throw new Error('Error value!');
  }
}, `${brace1}\n`).concat(`${none.repeat(spaseCount)}${brace2}`);

export default getStylish;
