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

const getStylish = (obj, spaseCount = 0) => Object.entries(obj).reduce((str, [key, values]) => {
  const {
    status, value, changedValue, children,
  } = values;

  const firstValue = _.isObject(value) ? convObjToString(value, spaseCount) : value;
  const secondValue = _.isObject(changedValue)
    ? convObjToString(changedValue, spaseCount) : changedValue;

  switch (status) {
    case 'unchanged':
      return getConcatString(str, spaseCount + twoSteps, key, none.repeat(twoSteps), firstValue);
    case 'changed':
      return getConcatString(str, spaseCount + twoSteps, key, del, firstValue)
        .concat(getConcatString('', spaseCount + twoSteps, key, add, secondValue));
    case 'added':
      return getConcatString(str, spaseCount + twoSteps, key, add, firstValue);
    case 'deleted':
      return getConcatString(str, spaseCount + twoSteps, key, del, firstValue);
    case 'notplain':
      return str.concat(`${none.repeat(spaseCount + fourSteps)}${key}: `)
        .concat(getStylish(children, spaseCount + fourSteps)).concat('\n');
    default:
      throw new Error('Error value!');
  }
}, `${brace1}\n`).concat(`${none.repeat(spaseCount)}${brace2}`);

export default getStylish;
