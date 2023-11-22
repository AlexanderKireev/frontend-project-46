import _ from 'lodash';

const getValByType = (value) => {
  if (value === null) return null;
  if (typeof value === 'string') return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const getPlain = (obj, recurseKey = null) => Object.entries(obj).reduce((str, [key, values]) => {
  const {
    status, value, changedValue, children,
  } = values;

  const firstValue = getValByType(value);
  const secondValue = getValByType(changedValue);
  const newKey = !recurseKey ? key : [recurseKey, key].join('.');

  switch (status) {
    case 'unchanged':
      return str;
    case 'changed':
      return str.concat(`Property '${newKey}' was updated. From ${firstValue} to ${secondValue}\n`);
    case 'added':
      return str.concat(`Property '${newKey}' was added with value: ${firstValue}\n`);
    case 'deleted':
      return str.concat(`Property '${newKey}' was removed\n`);
    case 'notplain':
      return str.concat(getPlain(children, newKey)).concat('\n');
    default:
      throw new Error('Error value!');
  }
}, '').slice(0, -1);

export default getPlain;
