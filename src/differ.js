import _ from 'lodash';

const getDiff = (dict1, dict2) => {
  // const keys = _.union(Object.keys(dict1), Object.keys(dict2)).sort();
  const keys = _.union(Object.keys(dict1), Object.keys(dict2));
  const sortedKeys = _.sortBy(keys, (key) => key);

  return sortedKeys.reduce((acc, key) => {
    if (_.isPlainObject(dict1[key]) && _.isPlainObject(dict2[key])) {
      acc[key] = { status: 'notplain', values: getDiff(dict1[key], dict2[key]) };
    } else if (!Object.hasOwn(dict2, key)) {
      acc[key] = { status: 'deleted', value1: dict1[key] };
    } else if (!Object.hasOwn(dict1, key)) {
      acc[key] = { status: 'added', value2: dict2[key] };
    } else if (dict1[key] === dict2[key]) {
      acc[key] = { status: 'unchanged', value1: dict1[key] };
    } else {
      acc[key] = { status: 'changed', value1: dict1[key], value2: dict2[key] };
    }
    return acc;
  }, {});
};

export default getDiff;
