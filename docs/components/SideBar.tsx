import { isActive } from '../utils/utils.js';
import { PropsWithUtility, useCallback, useState } from '../index.js';
import { DocItem } from '../types/index.js';
import Link from './Link.js';
import useScroll from '../hooks/useScroll.js';

export interface SideBarProps {
  items: Array<DocItem>;
  root: string;
}

export interface SideBarLinkProps extends HTMLElementProps<HTMLAnchorElement, AProps> {
  item: DocItem;
  root: string;
}

const SideBarLink = (props: SideBarLinkProps) => {
  const { item, root, onClick } = props;

  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen(!open), open);

  return (
    <>
      {!item.routes ? (
        <Link
          {...props}
          href={`${root}${item.path}`}
          isActive={isActive(`${root}${item.path}`)}
          onClick={onClick}
          class="m-l-18px m-y-1"
        >
          {item.title}
        </Link>
      ) : (
        <details open={open}>
          <summary onClick={toggle}>
            <Link
              {...props}
              href={`${root}${item.path}`}
              isActive={isActive(`${root}${item.path}`)}
              onClick={onClick}
              class="m-y-2"
            >
              {item.title}
            </Link>
          </summary>
          <div class="m-l-2 col border-l-solid  border-l-1px border-l-[color:var(--border)]">
            {item.routes?.map(sub => (
              <SideBarLink
                item={{ ...sub, path: `${item.path}/${sub.path}` }}
                root={root}
                onClick={onClick}
              >
                {sub.title}
              </SideBarLink>
            ))}
          </div>
        </details>
      )}
    </>
  );
};

export default ({ items, root }: PropsWithUtility<SideBarProps>) => {
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
          class="col gap-2 overflow-auto p-y-10 w-[var(--side-bar-width)]"
          style={{ height: 'calc(100vh - var(--nav-bar-height))' }}
        >
          {items.map(it => {
            return <SideBarLink item={it} root={root} />;
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
            'bg-[var(--primary)] fixed w-100% overflow-hidden',
            isOpen ? 'bottom-0px opacity-100' : '-bottom-100vh opacity-0',
          ]}
          style={{ height: 'calc(100vh - var(--nav-bar-height) - var(--side-bar-height))' }}
        >
          <div
            class="col gap-2 overflow-auto p-t-5 p-x-5"
            style={{ height: 'calc(100vh - var(--nav-bar-height) - var(--side-bar-height))' }}
          >
            {items.map(it => (
              <SideBarLink item={it} root={root} onClick={close} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
