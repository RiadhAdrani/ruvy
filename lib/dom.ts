import { Callback } from '@riadh-adrani/type-utils';
import { ElementComponent } from './types.js';

export const movePortalChildren = (container: Element, children: Array<Node>) => {
  children.forEach(child => container.appendChild(child));
};

export const renderElement = (
  tag: string,
  ns: string,
  attribute: Record<string, unknown>,
  events: Record<string, Callback>,
  parent: Element
): Element => {};
