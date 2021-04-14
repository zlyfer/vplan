// jshint esversion: 9

const url = "https://old.zlyfer.net/sites/bbs2-emden/vertretungsplan-api/?interface=false&javascript=false";

async function api(history, params) {
  if (history) {
    db = "&vsnormal=false";
  } else {
    db = "&vshistory=false";
  }
  if (params) {
  } else {
    params = "";
  }
  let data = await fetch(url + db + params);
  let json = await data.json();
  return json;
}
