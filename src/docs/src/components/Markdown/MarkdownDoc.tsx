import { useEffect, useState } from "../../../../index.js";
import Markdown from "./Markdown.js";

export default ({ url }: { url: string }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(url)
      .then(async (res) => {
        if (res.status === 200) {
          const text = await res.text();

          setContent(text);
        }
      })
      .catch(() => setContent("Unable to fetch doc."));
  }, url);

  return <Markdown content={content} />;
};
