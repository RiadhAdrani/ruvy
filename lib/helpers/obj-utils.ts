/**
 * checks if the object is a number
 * @param o object
 */
export const isNumber = (o: unknown): o is number => typeof o === 'number';

/**
 * checks if the object is an array
 * @param o object
 */
export const isArray = <T = unknown>(o: unknown): o is Array<T> => Array.isArray(o);

/**
 * checks if the object is an object
 * @param o object
 */
export const isObject = (o: unknown): o is object => typeof o === 'object';

/**
 * checks if the object is null
 * @param o object
 */
export const isNull = (o: unknown): o is null => o === null;

/**
 * checks if the object is undefined
 * @param o object
 */
export const isUndefined = (o: unknown): o is undefined => o === undefined;

/**
 * checks if the object is a boolean
 * @param o object
 */
export const isBoolean = (o: unknown): o is boolean => typeof o === 'boolean';

/**
 * checks if the object is a bigint
 * @param o object
 */
export const isBigint = (o: unknown): o is bigint => typeof o === 'bigint';

/**
 * checks if the object is a bigint
 * @param o object
 */
export const isSymbol = (o: unknown): o is symbol => typeof o === 'symbol';

/**
 * checks if the object is a function
 * @param o object
 */
export const isFunction = <F = () => void>(o: unknown): o is F => typeof o === 'function';

/**
 * checks if the object is falsy
 * @param o object
 */
export const isFalsy = (o: unknown): o is false | 0 | '' | null | undefined | typeof NaN =>
  [false, 0, -0, '', null, undefined, NaN].includes(o as boolean);

/**
 * checks if the object is of primitive type
 * @param o
 * @returns
 */
export const isPrimitive = (
  o: unknown
): o is string | number | bigint | boolean | undefined | symbol | null =>
  ['string', 'number', 'bigint', 'boolean', 'undefined', 'symbol', 'null'].includes(typeof o);

/**
 * checks if the object is a string.
 * @param o object
 */
const isString = (o: unknown): o is string => typeof o === 'string';

/**
 * checks if the object have the given property
 * @param o object
 * @param property object's key
 */
export const hasProperty = <V = unknown, K extends string | number | symbol = string>(
  o: unknown,
  property: K
): o is { [P in K]: V } => {
  if (isPrimitive(o)) return false;

  if (isNull(o)) return false;

  return Object.prototype.hasOwnProperty.call(o, property);
};

/**
 * Perform a shallow comparison between two objects.
 * @param o1 first object
 * @param o2 second object
 */
export const areShallowEqual = (o1: unknown, o2: unknown): boolean | undefined => {
  /**
   * compare the two object with the predefined Object.is
   */
  if (Object.is(o1, o2)) return true;

  /**
   * making sure both object are of type "object"
   */
  if (!isObject(o1) || !isObject(o2) || isNull(o1) || isNull(o2)) return false;

  return undefined;
};

/**
 * perform deep comparison of two objects of any type.
 * @param obj1 first object.
 * @param obj2 second object.
 * @param depth maximum comparison depth, `10` by default. This value improve performance with large object and circular dependencies
 * @returns
 */
export const areEqual = (obj1: unknown, obj2: unknown, depth = 10): boolean => {
  const shallowComparison = areShallowEqual(obj1, obj2);

  if (typeof shallowComparison === 'boolean') return shallowComparison;

  const key1 = Object.keys(obj1 as object);
  const key2 = Object.keys(obj2 as object);

  /**
   * compare the number of keys
   */
  if (key1.length !== key2.length) return false;

  /**
   * compare the keys identifier
   */
  if ([...key1].sort().join('') !== [...key2].sort().join('')) return false;

  /**
   * recursively compare each key value.
   */
  for (let i = 0; i < key1.length; i++) {
    const o1 = (obj1 as Record<string, string>)[key1[i]];
    const o2 = (obj2 as Record<string, string>)[key1[i]];

    const shallowComparison = areShallowEqual(o1, o2);

    if (shallowComparison === false) return false;

    if (depth > 0) {
      /**
       * We have an object as the value,
       * we recursively compare them.
       */
      if (!areEqual(o1, o2, depth - 1)) return false;
    }
  }

  return true;
};

/**
 * Create a new deep copy from the given object.
 * @param source Source object.
 */
export const copy = <T>(source: T): T => {
  if (isFalsy(source) || isPrimitive(source) || isFunction(source)) return source;

  const target = (Array.isArray(source) ? [] : {}) as Record<string, string>;

  Object.keys(source as Record<string, string>).forEach((key: string) => {
    target[key] = copy((source as Record<string, string>)[key]);
  });

  return target as T;
};

/**
 * modifies the target object by copying keys from the source, excluding the provided ones.
 * @param source
 * @param target
 * @param exclude
 */
export const copyKeys = <F extends object, T extends object>(
  source: F,
  target: T,
  ...exclude: Array<StringWithAutoComplete<keyof F>>
): void => {
  Object.keys(source)
    .filter(key => !exclude.includes(key))
    .forEach(key => {
      target[key as keyof T] = source[key as keyof F] as unknown as T[keyof T];
    });
};

/**
 * Run a callback for each key in a Record.
 * @param callback to be executed.
 * @param object source.
 */
export const forEachKey = <T extends object>(
  callback: (key: keyof T, value: T[keyof T], index: number) => void,
  object: T
): void => {
  if (!isFunction<(key: keyof T, value: T[keyof T], index: number) => void>(callback)) {
    throw `Expected a function for (callback) but found (${typeof object}).`;
  }

  if (!isObject(object)) {
    throw `Expected an object for (object) but found (${typeof object}).`;
  }

  Object.keys(object).forEach((key, index) =>
    callback(key as keyof T, object[key as keyof T], index)
  );
};

/**
 * force cast an object to the given generic type.
 */
const cast = <T = unknown>(obj: unknown): T => {
  return obj as unknown as T;
};

/**
 * returns the type of the given object
 * @param o object
 */
export const getType = (o: unknown): Type => {
  if (isNull(o)) return 'null';

  if (isUndefined(o)) return 'undefined';

  if (isNumber(o)) return 'number';

  if (isBigint(o)) return 'bigint';

  if (isString(o)) return 'string';

  if (isBoolean(o)) return 'boolean';

  if (isSymbol(o)) return 'symbol';

  if (isArray(o)) return 'array';

  return 'object';
};

/**
 * deeply merge two or more objects.
 * @param objects to merge.
 */
export const merge = <S extends object, T extends object = S>(...objects: Array<S>): T => {
  objects.forEach(o => {
    if (!isObject(o)) {
      throw new Error(`All argument should be of type (object) but one is (${getType(o)})`);
    }
  });

  return objects.reduce((output, object) => {
    // we check if one/both object/s is/are array
    if (isArray(object)) {
      if (isArray(output)) {
        // we merge indexes
        const l1 = (output as Array<unknown>).length;
        const l2 = (object as Array<unknown>).length;

        for (let i = 0; i < Math.max(l1, l2); i++) {
          if (!hasProperty(output, i)) {
            (output as Array<unknown>)[i] = (object as Array<unknown>)[i];
          } else if (
            getType(cast<Record<string, string>>(output)[i]) !== 'object' ||
            getType(cast<Record<string, string>>(object)[i]) !== 'object'
          ) {
            (output as Array<unknown>)[i] = (object as Array<unknown>)[i];
          } else {
            cast<Record<string, unknown>>(output)[i] = merge(
              (output as Record<string, Record<string, unknown>>)[i],
              (object as Record<string, Record<string, unknown>>)[i]
            );
          }
        }
      } else {
        // we replace output
        return object as unknown as T;
      }
    } else {
      Object.keys(object).forEach(key => {
        if (!hasProperty(output, key)) {
          cast<Record<string, unknown>>(output)[key] = cast<Record<string, unknown>>(object)[key];
        } else {
          if (
            getType(cast<Record<string, string>>(output)[key]) !== 'object' ||
            getType(cast<Record<string, string>>(object)[key]) !== 'object'
          ) {
            cast<Record<string, unknown>>(output)[key] = cast<Record<string, unknown>>(object)[key];
          } else {
            cast<Record<string, unknown>>(output)[key] = merge(
              (output as Record<string, Record<string, unknown>>)[key],
              (object as Record<string, Record<string, unknown>>)[key]
            );
          }
        }
      });
    }
    return output;
  }, {} as T) as T;
};

/**
 * create a new copy of the object while omitting specific keys.
 * @param object source object
 * @param keys keys to omit
 */
export const omit = <T extends object, K extends keyof T>(
  object: T,
  ...keys: Array<StringWithAutoComplete<keyof T | K>>
): Omit<T, K> => {
  const out = { ...object } as T;

  Object.keys(out as Record<string, unknown>).forEach(key => {
    if (keys.includes(key as K)) {
      delete out[key as keyof T];
    }
  });

  return out as Omit<T, K>;
};

/**
 * creates a new object with only the given keys.
 * @param object source.
 * @param keys keys to preserve
 */
export const pick = <T extends object, K extends keyof T>(
  object: T,
  ...keys: Array<keyof T | K>
): Pick<T, K> => {
  const out = {} as Pick<T, K>;

  Object.keys(object as Record<string, unknown>).forEach(key => {
    if (keys.includes(key as K)) {
      (out as unknown as T)[key as keyof T] = object[key as keyof T];
    }
  });

  return out;
};

export type Type =
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'number'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'object'
  | 'array';

type StringWithAutoComplete<T> = T | (string & Record<never, never>);
