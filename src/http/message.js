import { serverUrl } from './shared';

export const fetchMessages = async (friend) => {
	const url = `${serverUrl}/messages/${friend.id}`;

	const response = await fetch(url, { credentials: 'include' });
	if (!response.ok) {
		throw response.statusText;
	}

	const data = await response.json();
	return data;
};

export const sendMessage = async (friend, content) => {
	const url = `${serverUrl}/messages/${friend.id}`;

	const data = {
		message: {
			content,
		},
	};

	const response = await fetch(url, {
		credentials: 'include',
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw response.statusText;
	}

	return await response.json();
};
