const getClosestAnchorParent = (element: Element): HTMLAnchorElement | undefined => {
  if (element.tagName.toLowerCase() === 'a') {
    return element as HTMLAnchorElement;
  }

  const parent = element.parentElement;

  if (parent) {
    if (parent.tagName.toLowerCase() === 'a') {
      return parent as HTMLAnchorElement;
    } else if (parent.parentElement) {
      return getClosestAnchorParent(parent.parentElement);
    }
  }

  return undefined;
};

export default getClosestAnchorParent;
