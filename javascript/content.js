function content_init() {
  document.getElementById('suchen').addEventListener('click', async (e) => {
    let kurs = document.getElementById('kurs').value;
    let vertretungen = await api(kurs);
    document.getElementById('test').value = JSON.stringify(vertretungen);
  });
}