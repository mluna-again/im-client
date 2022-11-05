export const validateUsername = (username) => {
	if (username.length < 4) return 'too short';
	if (username.length > 15) return 'too long';

	return null;
};
