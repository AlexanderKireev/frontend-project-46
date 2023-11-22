import _ from 'lodash';

const getDiff = (dict1, dict2) => {
  const keys = _.union(Object.keys(dict1), Object.keys(dict2));
  const sortedKeys = _.sortBy(keys, (key) => key);

  return sortedKeys.reduce((acc, key) => {
    if (_.isPlainObject(dict1[key]) && _.isPlainObject(dict2[key])) {
      return { ...acc, [key]: { status: 'notplain', children: getDiff(dict1[key], dict2[key]) } };
    }
    if (!Object.hasOwn(dict2, key)) {
      return { ...acc, [key]: { status: 'deleted', value: dict1[key] } };
    }
    if (!Object.hasOwn(dict1, key)) {
      return { ...acc, [key]: { status: 'added', value: dict2[key] } };
    }
    if (dict1[key] === dict2[key]) {
      return { ...acc, [key]: { status: 'unchanged', value: dict1[key] } };
    }
    return { ...acc, [key]: { status: 'changed', value: dict1[key], changedValue: dict2[key] } };
  }, {});
};

export default getDiff;
