import React, { createContext, useContext, useState, ReactNode } from 'react';

import type { ApiError } from '@/api/client';
import { ErrorModal } from '@/components/ErrorModal';

interface ErrorContextValue {
  error: ApiError | null;
  setError: (error: ApiError | null) => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ApiError | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      <ErrorModal error={error} onClose={() => setError(null)} />
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}
