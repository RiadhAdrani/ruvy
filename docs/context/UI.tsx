import { Theme, Version, Versions } from '../types/index.js';
import { createComposable, useCallback, useEffect, useMemo, useState } from '../index.js';
import { getLogo, isDarkMode } from '../utils/utils.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { isBoolean } from '../../lib/helpers/obj-utils.js';
import { useScroll } from '../hooks/composables.js';

export const useApp = createComposable('app', () => {
  const [theme, setTheme] = useLocalStorage('@riadh-adrani-ruvy-docs-theme', Theme.Device);
  const [isNavOpen, setNavOpen] = useState(false);

  const [version, setVersion] = useState<Version>(Versions.at(-1) as Version);

  const [add, remove] = useScroll();

  const computedTheme = useMemo(() => {
    if (theme !== Theme.Device) {
      return theme;
    }

    return isDarkMode() ? Theme.Dark : Theme.Light;
  }, theme);

  useEffect(() => {
    document.querySelector(':root')?.setAttribute('data-theme', computedTheme);

    const iconElement = document.querySelector(`link[rel~='icon']`);

    if (iconElement) {
      (iconElement as HTMLLinkElement).href = getLogo();
    }
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

  // const selectDocVersion = useCallback(() => {

  // })

  return {
    theme,
    computedTheme,
    version,
    setVersion,
    toggleNav,
    toggleTheme,
    isNavOpen,
  };
});
