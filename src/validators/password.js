export const validatePassword = (password) => {
	if (password.length < 6) return 'too short';
	if (password.length > 72) return 'too long';

	return null;
};
