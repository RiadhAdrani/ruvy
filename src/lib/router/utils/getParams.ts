import fragmentize from "./fragmentize.js";

export default <T extends Record<string, unknown>>(path: string, template: string): T => {
  const params: Record<string, string> = {};

  const tF = fragmentize(template);
  const pF = fragmentize(path);

  tF.forEach((fragment, index) => {
    if (fragment[0] === ":") {
      params[fragment.substring(1)] = decodeURI(pF[index]);
    }
  });

  return params as T;
};
