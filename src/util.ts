import isPlainObject from 'lodash/isPlainObject';
import reduce from 'lodash/reduce';
import last from 'lodash/last';

export default class {
  static deep = (data: any, keys: string[]): any =>
    reduce(keys.slice(1), (value, key) => value[key], data[keys[0]]);
  static assert = (a: any, res: any): any => {
    if (
      a === null ||
      typeof a === 'string' ||
      typeof a === 'number' ||
      typeof a === 'boolean' ||
      Array.isArray(a) ||
      isPlainObject(a)
    ) {
      return res;
    }
    return null;
  };
  static keys = (a: any): string[] => Object.keys(a);
  static isObject = (a: any) => isPlainObject(a);
  static last = (a: any[]) => last(a);
}
