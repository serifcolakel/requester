import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './ThemeProvider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="requester">
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
