import { serverUrl } from './shared';

export const fetchUserByUsername = async (username) => {
	const url = `${serverUrl}/users/by_username/${username}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw response.statusText;
	}

	const data = await response.json();
	return data;
};

export const updateUser = async (user, payload) => {
	const url = `${serverUrl}/users/${user.id}`;
	const response = await fetch(url, {
		credentials: 'include',
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ user: payload }),
	});

	if (!response.ok) {
		throw response.statusText;
	}

	const data = await response.json();
	return data;
};
