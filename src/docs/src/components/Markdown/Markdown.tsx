import createDOMPurify from "dompurify";
import { marked } from "marked";
import Prism from "prismjs";
import { useEffect, useRef } from "../../../../index.js";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";

const DomPurify = createDOMPurify(window);

export default ({ content }: { content: string }) => {
  const div = useRef<HTMLDivElement>();

  useEffect(() => {
    if (div.value) {
      const html = DomPurify.sanitize(marked.parse(content));

      div.value.innerHTML = html;

      Prism.highlightAll();
    }
  }, content);

  return <div class="markdown-container" ref={div} />;
};
