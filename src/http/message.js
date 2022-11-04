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
