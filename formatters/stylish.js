const step = 4;
const none = ' ';
const add = '+';
const del = '-';
const brace1 = '{';
const brace2 = '}';

const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

const convObjToString = (obj, spaseCount) => Object.entries(obj)
  .reduce((string, [key, value]) => string
    .concat(`\n${none.repeat(spaseCount + step * 2)}${key}: `)
    .concat(isObject(value) ? `${convObjToString(value, spaseCount + step)}`
      : `${value}`), brace1).concat(`\n${none.repeat(spaseCount + step)}${brace2}`);

const getFormat = (obj, spaseCount = 0) => Object.entries(obj).reduce((string, [key, value]) => {
  let str = '';
  const {
    status, value1, value2, values,
  } = value;

  const oldValue = isObject(value1) ? convObjToString(value1, spaseCount) : value1;
  const newValue = isObject(value2) ? convObjToString(value2, spaseCount) : value2;

  switch (status) {
    case 'unchanged':
      str = str.concat(`${none.repeat(spaseCount + 2)}${none} ${key}: ${oldValue}`);
      break;
    case 'changed':
      str = str.concat(`${none.repeat(spaseCount + 2)}${del} ${key}: ${oldValue}\n`)
        .concat(`${none.repeat(spaseCount + 2)}${add} ${key}: ${newValue}`);
      break;
    case 'added':
      str = str.concat(`${none.repeat(spaseCount + 2)}${add} ${key}: ${newValue}`);
      break;
    case 'deleted':
      str = str.concat(`${none.repeat(spaseCount + 2)}${del} ${key}: ${oldValue}`);
      break;
    case 'notplain':
      str = str.concat(`${none.repeat(spaseCount + step)}${key}: `)
        .concat(getFormat(values, spaseCount + step));
      break;
    default:
      throw new Error('Error value!');
  }
  return string.concat(`${str}\n`);
}, `${brace1}\n`).concat(`${none.repeat(spaseCount)}${brace2}`);

export default getFormat;
