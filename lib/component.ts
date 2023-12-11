import {
  ComponentHandler,
  ComponentStatus,
  ComponentType,
  ElementComponent,
  ElementTemplate,
  MicroTask,
} from './types.js';

export const handleElement: ComponentHandler<ElementTemplate, ElementComponent> = (
  template,
  component,
  parent,
  key
) => {
  const { children, type, props } = template;

  const current: ElementComponent = component ?? {
    children: [],
    key,
    parent,
    props,
    status: ComponentStatus.Mounting,
    tag: ComponentType.Element,
    type,
    unmountedChildren: [],
  };

  const tasks: Array<MicroTask> = [];

  const innerHTML = props.innerHTML;

  if (!component) {
    // TODO: create an action that will render the

    current;
  } else {
  }

  return { children, component: current, tasks };
};
