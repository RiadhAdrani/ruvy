import { isActive } from '../utils/utils.js';
import { PropsWithChildren, useState } from '../index.js';
import { DocItem } from '../md/docs.js';
import Link from './Link.js';
import useScroll from '../hooks/useScroll.js';

export interface SideBarProps {
  items: Array<DocItem>;
  root: string;
}

export default ({ items, root }: PropsWithChildren<SideBarProps>) => {
  const [isOpen, setOpen] = useState(false);
  const [add, remove] = useScroll();

  const toggle = () => {
    const v = !isOpen;

    setOpen(v);
    v ? add() : remove();
  };

  const close = () => {
    setOpen(false);
    remove();
  };

  return (
    <>
      <div
        class={[
          'fixed top-[var(--nav-bar-height)]',
          'w-[var(--side-bar-width)]',
          'bg-[var(--primary)]',
          'border-r border-r-solid border-r-[color:var(--border-low)]',
          'overflow-hidden',
          'hidden md:flex md:col',
        ]}
        style={{ height: 'calc(100vh - var(--nav-bar-height))' }}
      >
        <div
          class="col gap-2 overflow-auto p-t-10 w-[var(--side-bar-width)]"
          style={{ height: 'calc(100vh - var(--nav-bar-height))' }}
        >
          {items.map(it => {
            return (
              <>
                <Link href={`${root}${it.path}`} isActive={isActive(`${root}${it.path}`)}>
                  {it.title}
                </Link>
                {it.routes?.map(sub => (
                  <Link
                    href={`${root}${it.path}/${sub.path}`}
                    isActive={isActive(`${root}${it.path}/${sub.path}`)}
                    class="m-l-3"
                  >
                    {sub.title}
                  </Link>
                ))}
              </>
            );
          })}
        </div>
      </div>
      <div class="col md:hidden fixed right-0 left-0 top-[var(--nav-bar-height)] w-100%">
        <p
          class={[
            'text-[var(--text-low)] hover:text-[var(--text)]',
            'p-y-1.5 w-100% cursor-pointer bg-[var(--primary)]',
            'border-b p-x-6 border-b-solid border-b-[color:var(--border-low)]',
            'h-[var(--side-bar-height)]',
          ]}
          onClick={() => toggle()}
        >
          Menu
        </p>
        <div
          class={[
            'bg-[var(--primary)] fixed p-x-5 w-100%',
            isOpen ? 'bottom-0px opacity-100' : '-bottom-100vh opacity-0',
          ]}
          style={{ height: 'calc(100vh - var(--nav-bar-height) - var(--side-bar-height))' }}
        >
          <div
            class="col gap-2 overflow-auto p-t-5"
            style={{ height: 'calc(100vh - var(--nav-bar-height) - var(--side-bar-height))' }}
          >
            {items.map(it => {
              return (
                <>
                  <Link
                    href={`${root}${it.path}`}
                    isActive={isActive(`${root}${it.path}`)}
                    onClick={close}
                  >
                    {it.title}
                  </Link>
                  {it.routes?.map(sub => (
                    <Link
                      href={`${root}${it.path}/${sub.path}`}
                      isActive={isActive(`${root}${it.path}/${sub.path}`)}
                      class="m-l-3"
                      onClick={close}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
