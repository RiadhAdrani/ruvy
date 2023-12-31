import createSanitizer from 'dompurify';
import { marked } from 'marked';
import { createDestination, useEffect, useMemo, useRef } from '../index.js';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';
import { isUrlNavigatable } from '@riadh-adrani/dom-router';

marked.use(gfmHeadingId());
marked.use(mangle());

const sanitizer = createSanitizer(window);

interface MarkdownProps {
  content: string;
}

export default ({ content }: MarkdownProps) => {
  const ref = useRef<HTMLDivElement>();

  const sanitizedContent = useMemo(
    () => sanitizer.sanitize(marked.parse(content), { ADD_ATTR: ['target'] }),
    content
  );

  useEffect(() => {
    if (!ref.value) return;

    // ref.value.innerHTML = sanitizedContent;

    Prism.highlightAll();

    // we need to make every code block clickable which will copy its content:
    ref.value.querySelectorAll(`.markdown-container pre[class*='language-']`).forEach(it => {
      it.addEventListener('click', () => {
        const content = it.textContent;

        if (content === null) {
          return;
        }

        navigator.clipboard
          .writeText(content)
          .then(() => {
            alert('Snippet copied !');
          })
          .catch(error => {
            console.error('Failed to copy text to clipboard:', error);
          });
      });
    });

    ref.value.querySelectorAll('a').forEach(it => {
      const href = it.getAttribute('href');

      if (!href) return;

      if (isUrlNavigatable(href)) {
        it.setAttribute('href', createDestination(href) ?? '');
      }
    });

    const hash = location.hash;

    if (!hash.trim()) return;

    setTimeout(() => {
      const view = ref.value?.querySelector(hash);
      view?.scrollIntoView();
    }, 100);
  }, content);

  return (
    <>
      <div class="markdown-container w-100%" ref={ref} innerHTML={sanitizedContent} />
    </>
  );
};
