import fragmentize from "./fragmentize.js";

export default <T extends Record<string, unknown>>(path: string, template: string): T => {
  const params: Record<string, string> = {};

  const templateFragments = fragmentize(template);
  const pathFragments = fragmentize(path);

  templateFragments.forEach((fragment, index) => {
    if (fragment[0] === ":") {
      params[fragment.substring(1)] = decodeURI(pathFragments[index]);
    }
  });

  return params as T;
};
