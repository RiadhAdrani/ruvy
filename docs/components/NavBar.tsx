import { UIContext } from '../context/UI.js';
import { useContext } from '../index.js';
import Button from './Button.js';

export default () => {
  const { computedTheme, toggleTheme } = useContext(UIContext);

  return (
    <div class={'row-center gap-2'}>
      <span>{computedTheme}</span>
      <Button type="fill" onClick={() => toggleTheme()}>
        Fill
      </Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </div>
  );
};
