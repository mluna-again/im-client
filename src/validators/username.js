export const validateUsername = (username) => {
	if (username.length < 4) return 'too short';
	if (username.length > 15) return 'too long';
	if (/[^a-zA-Z0-9_]/i.test(username))
		return 'only letters, numbers and _ are allowed';

	return null;
};
