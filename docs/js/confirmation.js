const saveFile = () => {

    var downloadLink = document.createElement("a");
    // set the file name...
    downloadLink.download = "kvittens.html";

    kvittensHTML = document.getElementById("kvittens").innerHTML; //document.documentElement.innerHTML

    downloadLink.href = 'data:text/html;charset=utf-8,<html>' + escape(kvittensHTML) + '</html>';
    // automaitcally click the <a> element to go to the URL to save the textFileAsBlob...
    downloadLink.click();
}



window.onload = async () => {
  let params = (new URL(document.location)).searchParams;
  let email = params.get('email');
  let order_id = params.get('order_id');
  document.getElementById("email").innerText = email;
  document.getElementById("order_id").innerText = order_id;

  window.history.replaceState({}, document.title, "/create/");

};
