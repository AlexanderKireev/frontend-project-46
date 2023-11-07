import _ from 'lodash';

const getValByType = (value) => {
  if (value === null) return null;
  if (typeof value === 'string') return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const getPlain = (obj, recurseKey = null) => Object.entries(obj).reduce((str, [key, value]) => {
  const {
    status, value1, value2, values,
  } = value;

  const oldValue = getValByType(value1);
  const newValue = getValByType(value2);
  const newKey = !recurseKey ? key : [recurseKey, key].join('.');

  switch (status) {
    case 'unchanged':
      return str;
    case 'changed':
      return str.concat(`Property '${newKey}' was updated. From ${oldValue} to ${newValue}\n`);
    case 'added':
      return str.concat(`Property '${newKey}' was added with value: ${newValue}\n`);
    case 'deleted':
      return str.concat(`Property '${newKey}' was removed\n`);
    case 'notplain':
      return str.concat(getPlain(values, newKey)).concat('\n');
    default:
      throw new Error('Error value!');
  }
}, '').slice(0, -1);

export default getPlain;
