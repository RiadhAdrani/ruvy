/**
 * force cast an object to the given generic type.
 * @param obj source
 */
export const cast = <T = unknown>(obj: unknown): T => {
  return obj as unknown as T;
};

export type Callback<Return = void, Args extends Array<unknown> = Array<unknown>> = (
  ...args: Args
) => Return;

export type Arrayable<T> = T | Array<T>;

export type ArrayType<T extends readonly unknown[]> = T extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type StringWithAutoComplete<T> = T | (string & Record<never, never>);
