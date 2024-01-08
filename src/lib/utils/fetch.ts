import secureLocalStorage from 'react-secure-storage';

const customFetch = async (
  url: string | URL | Request,
  options?: RequestInit
) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response;
};

export default customFetch;
