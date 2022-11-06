const DAYS_SHORT_NAMES = {
	1: 'MO',
	2: 'TH',
	3: 'WE',
	4: 'TH',
	5: 'FR',
	6: 'SA',
	7: 'SU',
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

	const day = actualDate.getDay();
	const month = actualDate.getMonth() + 1;
	const dayName = DAYS_SHORT_NAMES[day];

	return [String(day), String(month), dayName];
};
