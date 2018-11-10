import { createMuiTheme } from '@material-ui/core/styles';

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

export function API_URL() {
	// console.log(process.env.NODE_ENV);
	// return process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'http://where-we-stuck-api.herokuapp.com/'; 
	return 'https://where-we-stuck-api.herokuapp.com/';  
}

export function getTheme() {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#a91e20',
			},
			secondary: {
				main: '#f7d54c',
			},
		},
	})

	return theme;
}