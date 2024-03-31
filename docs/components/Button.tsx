import { join } from '../utils/utils.js';
import { useMemo, joinClasses } from '../index.js';
import { ButtonProps, HTMLElementProps } from '@/dom.js';
import { PropsWithUtility } from '@/types.js';

interface UButtonProps extends HTMLElementProps<HTMLButtonElement, ButtonProps> {
  type: 'text' | 'fill' | 'outline';
}

const Button = (props: PropsWithUtility<Partial<UButtonProps>>) => {
  const { children, type, class: className } = props;

  const classes = useMemo<string>(() => {
    if (type === 'fill') {
      return join([
        'border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]',
        'bg-[color:var(--secondary)] hover:bg-[color:var(--secondary-hover)]',
      ]);
    }

    if (type === 'outline') {
      return join([
        'border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]',
        'hover:bg-[color:var(--secondary)]',
        'bg-transparent',
      ]);
    }

    return join([
      'bg-transparent hover:bg-[color:var(--secondary)]',
      'border-transparent',
      'color-[var(--text-low)] hover:color-[var(--text)]',
    ]);
  }, type);

  return (
    <button
      {...props}
      class={joinClasses('p-x-4 p-y-2 cursor-pointer rounded', classes, className)}
    >
      {children}
    </button>
  );
};

export default Button;
