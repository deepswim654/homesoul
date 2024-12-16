'use client';

import { FC, PropsWithChildren } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary/ErrorBoundary';

export const ErrorBoundaryProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}; 