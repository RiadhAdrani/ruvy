import createSanitizer from 'dompurify';
import { marked } from 'marked';
import { useEffect, useRef } from '../index.js';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';
import { isBlank } from '@riadh-adrani/str-utils';

marked.use(gfmHeadingId());
marked.use(mangle());

const sanitizer = createSanitizer(window);

interface MarkdownProps {
  content: string;
}

export default ({ content }: MarkdownProps) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.value) {
      const parsed = marked.parse(content);

      ref.value.innerHTML = sanitizer.sanitize(parsed, { ADD_ATTR: ['target'] });

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

      const hash = location.hash;

      if (isBlank(hash)) return;

      setTimeout(() => {
        const view = ref.value?.querySelector(hash);
        view?.scrollIntoView();
      }, 100);
    }
  }, content);

  return <div class="markdown-container w-100%" ref={ref}></div>;
};
