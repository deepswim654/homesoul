export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleFetchError = (error: unknown): APIError => {
  if (error instanceof APIError) {
    return error;
  }

  if (error instanceof Error) {
    return new APIError(error.message);
  }

  return new APIError('An unexpected error occurred');
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && (
    error.message.includes('Failed to fetch') ||
    error.message.includes('Network request failed')
  );
};

export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message;
  }

  if (error instanceof Error) {
    if (isNetworkError(error)) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    return error.message;
  }

  return 'An unexpected error occurred';
}; 