window.onload = async () => {
  let params = (new URL(document.location)).searchParams;
  let url = params.get('next');
  let error = params.get('error');

  if(!!url)
  url = decodeURIComponent(url);

  window.history.replaceState({}, document.title, "/kvitto/");

  if(!!error){
    document.getElementById("alert-error").style.display = 'block';
  }else{
    if (!!url){
      var next = document.getElementById("create-certificate");

              var a = document.createElement('a');
              var link = document.createTextNode("Gå vidare till skapa certifikat >");
              a.classList.add("fs-4");
              a.appendChild(link);
              a.title = "Utfärda";
              a.href = url;
              next.insertAdjacentElement("beforeend", a);

                document.getElementById("alert-ok").style.display = 'block';
    }else{
        document.getElementById("alert-kvitto").style.display = 'block';
    }

  }

};
