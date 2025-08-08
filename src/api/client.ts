const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

export type ApiError = {
  message: string;
};

async function request<T>(path: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 400 && data.message) {
        throw { message: data.message } as ApiError;
      }
      throw new Error('Brak połączenia z serwerem');
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error && !(error as ApiError).message) {
      throw error;
    }
    throw error as ApiError;
  }
}

export const apiClient = {
  post: <T, B>(path: string, body: B) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};
