const DAYS_SHORT_NAMES = {
	0: 'SU',
	1: 'MO',
	2: 'TU',
	3: 'WE',
	4: 'TH',
	5: 'FR',
	6: 'SA',
};

/**
 * This is a function.
 *
 * @param {Date|string} date - An object of type Date, or a string that can't be parse into one
 * @return {[string, string, string]} items - A three element tuple with [day, month, dayShortName]
 *
 * @example
 * messageDate(new Date("Sat Nov 05 2022 18:20:26 GMT-0600 (Central Standard Time)")) // [05, 11, 'Sa']
 */
export const messageDate = (date) => {
	const actualDate = new Date(date);

	const day = actualDate.getDate();
	const month = actualDate.getMonth() + 1;
	const dayName = DAYS_SHORT_NAMES[actualDate.getDay()];

	return [String(day), String(month), dayName];
};
