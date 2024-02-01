import Markdown from '../components/Markdown.js';
import Button from '../components/Button.js';
import { useMemo } from '../index.js';
import Footer from '../components/Footer.js';
import useLogo from '../hooks/useLogo.js';

export default () => {
  const createScript = useMemo<string>(() => {
    return ['```bash', 'npm install @riadh-adrani/ruvy', '```'].join('\n');
  });

  const logo = useLogo();

  return (
    <>
      <div class="col-center flex-1">
        <div class="col-center gap-5 flex-1 p-b-20">
          <div class="col-center">
            <img src={logo} class="h-150px w-150px" />
            <h1
              class="text-72px text-center"
              style={{
                background: 'linear-gradient(var(--text-lowest),var(--text))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ruvy
            </h1>
          </div>
          <p class="text-center m-b-5 color-[var(--text-low)]">
            Ruvy is a lightweight front-end framework inspired by the principles of React, designed
            specifically for learning purposes. It incorporates familiar concepts such as JSX,
            function components, and hooks, providing a simplified and synchronous approach to
            building web applications.
          </p>
          <div class="row self-center gap-4 m-b-5">
            <a href="/learn">
              <Button type="fill">Get Started</Button>
            </a>
            <a href="/docs">
              <Button type="fill">Browse Docs</Button>
            </a>
            <a href="https://stackblitz.com/edit/ruvy-dbjavf?file=src%2Fmain.tsx" target="_blank">
              <Button type="fill">Try on StackBlitz</Button>
            </a>
          </div>
          <div class="cursor-pointer home-create-bash rounded self-center">
            <Markdown content={createScript ?? ''} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
