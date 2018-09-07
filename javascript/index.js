const remote = require('electron').remote;

window.onload = () => {
	index_init();
	content_init();
};

function index_init() {
	document.getElementById('minimize').addEventListener('click', e => {
		remote.getCurrentWindow().minimize();
	});
	document.getElementById('maximize').addEventListener('click', e => {
		if (!remote.getCurrentWindow().isMaximized()) {
			remote.getCurrentWindow().maximize();
		} else {
			remote.getCurrentWindow().unmaximize();
		}
	});
	document.getElementById('close').addEventListener('click', e => {
		remote.getCurrentWindow().close();
	});
}