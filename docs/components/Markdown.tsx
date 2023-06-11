import createSanitizer from 'dompurify';
import { marked } from 'marked';
import { useEffect, useRef } from '../index.js';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

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

      ref.value.innerHTML = sanitizer.sanitize(parsed);

      Prism.highlightAll();
    }
  }, content);

  return <div class="markdown-container w-100%" ref={ref}></div>;
};
