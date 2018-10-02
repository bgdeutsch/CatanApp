export function trimDateTime(string) {
	return string.substring(0, string.indexOf('T'));
}

export function isJavaScriptObjectEmpty(object) {
	for (let key in object) {
		if (object.hasOwnProperty(key))
			return false;
	}
	return true;
}