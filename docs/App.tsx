import { ErrorBoundary, Outlet, useErrorBoundary } from './index.js';

const Fallback = () => {
  const [error, recover] = useErrorBoundary();

  return (
    <div>
      <h1>Ooops !</h1>
      <h3>Something went wrong!</h3>
      <p>{error}</p>
      <button onClick={recover}>reload</button>
    </div>
  );
};

export default () => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Outlet />
    </ErrorBoundary>
  );
};
