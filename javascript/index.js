// jshint esversion: 9

const remote = require("electron").remote;

window.onload = () => {
  index_init();
  content_init();
};

function index_init() {
  document.getElementById("minimize").addEventListener("click", (e) => {
    remote.getCurrentWindow().minimize();
  });
  document.getElementById("maximize").addEventListener("click", (e) => {
    if (!remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().maximize();
    } else {
      remote.getCurrentWindow().unmaximize();
    }
  });
  document.getElementById("close").addEventListener("click", (e) => {
    remote.getCurrentWindow().close();
  });
}

function loading_animation() {
  let la = document.getElementById("loading_animation");
  let state = la.style.display;
  if (state == "block") {
    la.style.display = "none";
  } else {
    la.style.display = "block";
  }
}
