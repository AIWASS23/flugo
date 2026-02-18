export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const message =
      'message' in error && typeof error.message === 'string'
        ? error.message
        : null;
    const code = 'code' in error && typeof error.code === 'string' ? error.code : null;

    if (code && message) {
      return `${code}: ${message}`;
    }

    if (message) {
      return message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'erro desconhecido';
}
