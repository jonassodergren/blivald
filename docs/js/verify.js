window.onload = async () => {

  let params = (new URL(document.location)).searchParams;
  let id = params.get('id');
  document.getElementById("certificate_id").value = id;
    window.history.replaceState({}, document.title, "/verify/");
};
