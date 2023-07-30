import { Theme } from '../types/index.js';
import { createContext, useCallback, useEffect, useMemo, useState } from '../index.js';
import { isDarkMode } from '../utils/utils.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { isBoolean } from '@riadh-adrani/obj-utils';
import useScroll from '../hooks/useScroll.js';

interface IUIConext {
  theme: Theme;
  computedTheme: Theme;
  isNavOpen: boolean;
  toggleNav: (v?: boolean) => void;
  toggleTheme: (v?: Theme) => void;
}

export const UIContext = createContext<IUIConext>({
  theme: Theme.Device,
  computedTheme: Theme.Light,
  toggleTheme: () => 0,
  isNavOpen: false,
  toggleNav: () => 0,
});

export const UIProvider = ({ children }: { children?: unknown }) => {
  const [theme, setTheme] = useLocalStorage('@riadh-adrani-ruvy-docs-theme', Theme.Device);
  const [isNavOpen, setNavOpen] = useState(false);

  const [add, remove] = useScroll();

  const computedTheme = useMemo(() => {
    if (theme !== Theme.Device) {
      return theme;
    }

    return isDarkMode() ? Theme.Dark : Theme.Light;
  }, theme);

  useEffect(() => {
    document.querySelector(':root')?.setAttribute('data-theme', computedTheme);
  }, computedTheme);

  const toggleTheme = useCallback((value?: Theme) => {
    const v: Theme = value ?? computedTheme === Theme.Dark ? Theme.Light : Theme.Dark;

    setTheme(v);
  }, theme);

  const toggleNav = useCallback((value?: boolean) => {
    const v = isBoolean(value) ? (value as boolean) : !isNavOpen;

    v ? add() : remove();
    setNavOpen(v);
  }, isNavOpen);

  return (
    <UIContext.Provider value={{ theme, computedTheme, toggleTheme, isNavOpen, toggleNav }}>
      {children}
    </UIContext.Provider>
  );
};
