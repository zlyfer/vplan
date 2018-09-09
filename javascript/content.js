var vertretungen;

function content_init() {
	refreshPlan();
	document.getElementById('searchkurs').addEventListener('input', function(e) {
		search(this, 'kurspanel', false);
	});
	document.getElementById('searchanything').addEventListener('input', function(e) {
		search(this, 'vertretungspanel', true);
	});
	document.getElementById('backtokurspanel').addEventListener('click', function(e) {
		clearAll();
		showPanel('kurspanel');
	});
}

function search(psthis, panelname, deep) {
	let panel = document.getElementById(panelname);
	for (let i = 0; i < panel.children.length; i++) {
		let pc = panel.children[i];
		let valid = false;
		if (deep) {
			for (let j = 0; j < pc.children.length; j++) {
				apply(pc.children[j]);
			}
		} else {
			apply(pc.firstChild);
		}
		adjustPanel(panelname);

		function apply(pec) {
			if (pec.innerHTML.toLowerCase().includes(psthis.value.toLowerCase())) {
				valid = true;
			}
			if (valid) {
				pec.parentElement.style.display = "block";
			} else {
				pec.parentElement.style.display = "none";
			}
		}
	}
}

function add_kurspanel_entry(kurs, wochentage) {
	let kurspanel = document.getElementById('kurspanel');
	let newentrydiv = document.createElement('div');
	let newentryspan = document.createElement('span');
	newentrydiv.className = 'kurspanel_entry';
	newentryspan.className = 'kurspanel_entry kurspanel_entry_kurs';
	newentryspan.id = `${kurs}`;
	newentryspan.innerHTML = `${kurs}`;
	newentrydiv.append(newentryspan);
	wochentage.forEach(w => {
		let newentrydivd = document.createElement('div');
		let newentryspan = document.createElement('span');
		newentrydivd.className = 'kurspanel_entry_days';
		newentryspan.className = 'kurspanel_entry kurspanel_entry_days';
		newentryspan.purpose = {
			"kurs": kurs,
			"wochentag": w
		};
		newentryspan.innerHTML = `${w} (${getDataCount(kurs, w)})`;
		newentrydivd.append(newentryspan);
		newentrydivd.addEventListener('click', e => {
			clearAll();
			genKurs(e.target.purpose);
			showPanel('vertretungspanel');
		});
		newentrydiv.append(newentrydivd);
	});
	if (wochentage.length % 2 != 0) {
		newentrydiv.lastChild.firstChild.className += ' single';
	}
	kurspanel.append(newentrydiv);
}

function getDataCount(kurs, wochentag) {
	let count = 0;
	vertretungen.forEach(v => {
		if (v.kurs == kurs && v.wochentag == wochentag) {
			count++
		}
	})
	return count;
}

function refreshKurspanel() {
	let kurspanel = document.getElementById('kurspanel');
	for (let i = kurspanel.children.length - 1; i >= 0; i--) {
		kurspanel.children[i].remove();
	}
	let kurslist = {};
	vertretungen.forEach((v) => {
		let kurs = v.kurs;
		let wochentag = v.wochentag;
		if (kurslist[kurs]) {
			if (!kurslist[kurs].includes(wochentag)) {
				kurslist[kurs].push(wochentag);
			}
		} else {
			kurslist[kurs] = [wochentag];
		}
	});
	for (kurs in kurslist) {
		let sortlist = [];
		['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'].forEach(wt => {
			if (kurslist[kurs].includes(wt)) {
				sortlist.push(wt);
			}
		})
		kurslist[kurs] = sortlist;
		add_kurspanel_entry(kurs, kurslist[kurs]);
	}
	clearAll();
	showPanel('kurspanel');
}

function add_vertretungspanel_entry(vertretungsdata) {
	let vertretungspanel = document.getElementById('vertretungspanel');
	let newentrydiv = document.createElement('div');
	newentrydiv.className = 'vertretungspanel_entry';

	let keys = ['kurs', 'datum', 'fach', 'lehrer', 'raum', 'stunde', 'info', 'vertretungstext'];
	for (let i = 0; i < keys.length; i++) {
		let entry = keys[i];
		let newentryspankey = document.createElement('span');
		let newentryspan = document.createElement('span');
		newentryspankey.className = 'vertretungspanel_entry key';
		newentryspan.className = 'vertretungspanel_entry value';
		newentryspankey.innerHTML = `${entry[0].toUpperCase()}${entry.slice(1, entry.length)}`;
		newentryspan.innerHTML = `${vertretungsdata[entry]}`;
		newentrydiv.append(newentryspankey);
		newentrydiv.append(newentryspan);
	}
	vertretungspanel.append(newentrydiv);
}

function clearAll() {
	let searchkurs = document.getElementById('searchkurs');
	let searchanything = document.getElementById('searchanything');
	let kurspanel = document.getElementById('kurspanel');
	let vertretungspanel = document.getElementById('vertretungspanel');
	let backtokurspanel = document.getElementById('backtokurspanel');
	searchkurs.style.display = 'none';
	searchanything.style.display = 'none';
	kurspanel.style.display = 'none';
	vertretungspanel.style.display = 'none';
	backtokurspanel.style.display = 'none';
	for (let i = vertretungspanel.children.length - 1; i >= 0; i--) {
		vertretungspanel.children[i].remove();
	}
}

function showPanel(panelname) {
	let panel = document.getElementById(panelname);
	panel.style.display = 'block';
	switch (panelname) {
		case 'kurspanel':
			let searchkurs = document.getElementById('searchkurs');
			searchkurs.style.display = 'block';
			break;
		case 'vertretungspanel':
			let searchanything = document.getElementById('searchanything');
			let backtokurspanel = document.getElementById('backtokurspanel');
			searchanything.style.display = 'block';
			backtokurspanel.style.display = 'block';
			break;
	}
	adjustPanel(panelname);
}

function adjustPanel(panelname) {
	let panel = document.getElementById(panelname);
	let j = 0;
	for (let i = 0; i < panel.children.length; i++) {
		let child = panel.children[i];
		if (child.style.display != 'none') {
			child.className = child.className.replace(' first', '').replace(' last', '');
			j++
			switch (j) {
				case 1:
					child.className += ' first';
					break;
				case 5:
					child.className += ' last';
					j = 0;
					break;
			}
		}
	}
}

function genKurs(purpose) {
	vertretungen.forEach(v => {
		if (v.kurs == purpose.kurs && v.wochentag == purpose.wochentag) {
			add_vertretungspanel_entry(v);
		}
	})
}

async function refreshPlan() {
	await api(false)
		.then(v => {
			vertretungen = v.vertretungen;
			refreshKurspanel()
		});
}