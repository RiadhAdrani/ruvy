import { useApp } from '../hooks/composables.js';
import { useMemo } from '../index.js';
import { DocVersion, Versions } from '../types/index.js';
import Markdown from './Markdown.js';
import NotFound from './NotFound.js';

export default ({ versions }: { versions: Array<DocVersion> }) => {
  const { version } = useApp();

  const md = useMemo<string | undefined>(() => {
    const index = Versions.indexOf(version);

    if (index === -1) {
      throw 'invalid version';
    }

    for (const v of versions) {
      if (v.from === version || v.to === version) {
        return v.md;
      }

      const from = Versions.indexOf(v.from);

      if (!v.to) {
        if (from <= index) {
          return v.md;
        }
      } else {
        const to = Versions.indexOf(v.to);

        if (from <= index && index <= to) {
          return v.md;
        }
      }
    }

    return undefined;
  }, [version, versions]);

  return md ? <Markdown content={md} /> : <NotFound />;
};
