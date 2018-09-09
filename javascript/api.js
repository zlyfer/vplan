const url = 'https://vplan.zlyfer.net/api/api.php?interface=false';

async function api(history, params) {
	if (history) {
		db = '&vsnormal=false';
	} else {
		db = '&vshistory=false';
	}
	if (params) {} else {
		params = "";
	}
	let data = await fetch(url + db + params);
	let json = await data.json();
	return json;
}