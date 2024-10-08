import { Arrayable } from '../../lib/helpers/type-utils.js';
import { joinClasses, useMemo } from '../index.js';
import { PropsWithUtility } from '@/types.js';
import { AProps, HTMLElementProps } from '@/dom.js';

export interface LinkProps extends HTMLElementProps<HTMLAnchorElement, AProps> {
  isActive: boolean;
}

export default (props: Partial<PropsWithUtility<LinkProps>>) => {
  const { children, class: className, isActive } = props;

  const classes = useMemo<Arrayable<string>>(() => {
    let initial = 'p-x-2 text-[0.9em]';

    if (isActive) {
      initial += ' color-[var(--link)]';
    } else {
      initial += ' color-[var(--text-low)] hover:color-[var(--text-strong)]';
    }

    return joinClasses(initial, className);
  }, [className, isActive]);

  return (
    <a {...props} class={classes}>
      {children}
    </a>
  );
};
