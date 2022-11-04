import { serverUrl } from './shared';

export const fetchUserByUsername = async (username) => {
  const url = `${serverUrl}/users/by_username/${username}`

  const response = await fetch(url);
  if (!response.ok) {
    throw response.statusText;
  }

  const data = await response.json();
  return data;
};
