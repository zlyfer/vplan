const url = 'https://vplan.zlyfer.net/api/api.php?interface=false';

async function api(kurs = "", db = '&vshistory=false') {
	if (kurs) {
		kurs = `&Kurs=${kurs}`;
	}
	console.log(url + db + kurs);
	let data = await fetch(url + db + kurs);
	let json = await data.json();
	return json;
}