export default (_base = ""): string => {
  const base = `/${_base}`;

  return location.pathname.substring(base.length);
};
