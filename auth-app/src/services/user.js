const baseUrl = import.meta.env.VITE_BASE_URL;

export async function login(data) {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function register(data) {
  const response = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      access_token: localStorage.getItem('access_token'),
    },
    body: JSON.stringify(data),
  });

  return response;
}

export function getUsers() {
  return fetch(`${baseUrl}/users`, {
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}