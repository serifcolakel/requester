import { PropsWithChildren } from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary';

import { Button } from '@components/ui/button';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center" role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={() => window.location.reload()}>Reload</Button>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default function ErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
