import { PropsWithChildren } from '../index.js';

interface UToggleProps extends ComponentProps<HTMLSpanElement, InputProps> {
  onColor: string;
  onImg: string;
  offColor: string;
  offImg: string;
}

export default (props: PropsWithChildren<Partial<UToggleProps>>) => {
  return (
    <label {...props} class="switch rounded scale-55 u-border">
      <input checked={props.checked} type="checkbox" class:switch-input />
      <span class="switch-slider rounded before:rounded"></span>
    </label>
  );
};
