import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <BrowserRouter>{children}</BrowserRouter>
    </ErrorBoundary>
  );
}
