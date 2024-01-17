/* eslint-disable @typescript-eslint/no-explicit-any */
import { Theme, Versions } from '../types/index.js';
import { useApp } from '../context/UI.js';
import Toggle from './Toggle.js';
import Link from './Link.js';
import Button from './Button.js';
import Footer from './Footer.js';
import { isActive } from '../utils/utils.js';
import useLogo from '../hooks/useLogo.js';
import { useMemo } from '../index.js';

export default () => {
  const { computedTheme, toggleTheme, isNavOpen, toggleNav, version, setVersion } = useApp();

  const logo = useLogo();

  const menuItems = useMemo(() => [
    { title: 'Learn', href: '/learn' },
    { title: 'Docs', href: '/docs' },
    { title: 'Examples', href: '/examples' },
    { title: 'Acknowledgment', href: '/acknowledgment' },
  ]);

  const externalItems = useMemo(() => [
    { title: 'GitHub', href: 'https://github.com/RiadhAdrani/ruvy' },
  ]);

  return (
    <>
      <div
        class={[
          'row-center',
          'w-100%',
          'bg-[color:var(--primary)]',
          'p-x-5',
          'h-[var(--nav-bar-height)]',
          'border-b border-b-1px border-b-solid border-[color:var(--border-low)]',
          'fixed top-0px z-[var(--nav-bar-z)]',
        ]}
      >
        <div class="row justify-between items-center max-w-1200px flex-1 z-2">
          <div class="row items-center gap-8">
            <a href={{ name: 'Home' }} class="p-x-1 row-center gap-3">
              <img src={logo} class="h-25px w-25px" />
              <h2 class="hidden md:inline-block">Ruvy</h2>
            </a>
            <div class="row hidden md:flex gap-1">
              {menuItems.map(it => (
                <Link href={it.href} target="_blank" isActive={isActive(it.href)}>
                  {it.title}
                </Link>
              ))}
            </div>
          </div>
          <div class="row hidden gap-3 md:flex items-center">
            <div class="row gap-1">
              {externalItems.map(it => (
                <Link href={it.href} target="_blank">
                  {it.title}
                </Link>
              ))}
            </div>
            <select onChange={e => setVersion((e.target as any).value)}>
              {Versions.map(it => (
                <option key={it} selected={version === it} value={it}>
                  v{it}
                </option>
              ))}
            </select>
            <Toggle checked={computedTheme === Theme.Dark} onChange={() => toggleTheme()} />
          </div>
          <div class="col md:hidden">
            <Button
              type="text"
              class={[
                'nav-bar-mobile-btn col-center',
                isNavOpen ? 'nav-bar-mobile-btn-expanded' : '',
              ]}
              onClick={() => toggleNav()}
            />
          </div>
        </div>
      </div>
      <div
        class={[
          'col md:hidden',
          isNavOpen ? 'top-[var(--nav-bar-height)] opacity-100' : '-top-100vh opacity-0',
          'fixed left-0px right-0px',
          'bg-[color:var(--primary)]',
          'overflow-y-auto',
          'duration-[var(--t-long)]',
          'p-5',
          'z-1',
        ]}
        style={{ height: 'calc(100vh - var(--nav-bar-height))' }}
      >
        <div
          class={[
            'col gap-3 p-y-5',
            'border-b border-b-solid border-b-1px border-[color:var(--border-low)]',
          ]}
        >
          {menuItems.map(it => (
            <Link
              href={it.href}
              class={''}
              target="_blank"
              isActive={isActive(it.href)}
              onClick={() => toggleNav(false)}
            >
              {it.title}
            </Link>
          ))}
        </div>
        <div
          class={[
            'col gap-3 p-y-5',
            'border-b border-b-solid border-b-1px border-[color:var(--border-low)]',
          ]}
        >
          {externalItems.map(it => (
            <Link href={it.href} target="_blank">
              {it.title}
            </Link>
          ))}
        </div>
        <div class={'row items-center justify-between p-y-5 text-[var(--text-low)]'}>
          <p class={'p-x-2'}>Theme</p>
          <Toggle checked={computedTheme === Theme.Dark} onChange={() => toggleTheme()} />
        </div>
        <Footer />
      </div>
    </>
  );
};
