import { Arrayable } from '@riadh-adrani/utils';
import { PropsWithChildren, joinClasses, useMemo } from '../index.js';

export interface LinkProps extends ComponentProps<HTMLAnchorElement, AProps> {
  isActive: boolean;
}

export default (props: Partial<PropsWithChildren<LinkProps>>) => {
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
