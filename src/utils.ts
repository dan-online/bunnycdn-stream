export const lowerObject = <T>(obj: object) => {
	const newObj: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(obj)) {
		newObj[key[0].toLowerCase() + key.slice(1)] = value;
	}

	return newObj as T;
};
