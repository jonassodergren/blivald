window.onload = async () => {
  let params = (new URL(document.location)).searchParams;
  let error = params.get('errorCode');
  document.getElementById("alert").innerText = 'Felkod:' + error;

  window.history.replaceState({}, document.title, "/error/");

};
