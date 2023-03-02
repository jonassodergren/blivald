window.onload = async () => {
  let params = (new URL(document.location)).searchParams;
  let url = params.get('next');
  let error = params.get('error');
  let email = params.get('email');

  if(!!url)
  url = decodeURIComponent(url);

  window.history.replaceState({}, document.title, "/kvitto/");

  if(!!error){
    document.getElementById("alert-error").style.display = 'block';
  }else{
    if (!!url){
      var next = document.getElementById("create-certificate");

              var a = document.createElement('a');
              var link = document.createTextNode("Kolla så att din adress inte är felstavad, klicka och prova igen om du behöver >");
              a.classList.add("fs-4");
              a.appendChild(link);
              a.title = "Prova igen";
              a.href = "https://blivald.se";

              var text = document.createElement('span');
              text.innerText = email;

              next.insertAdjacentElement("beforeend", text);

              var br = document.createElement("br");
              next.insertAdjacentElement("beforeend", br);

              next.insertAdjacentElement("beforeend", a);



                document.getElementById("alert-ok").style.display = 'block';
    }else{
        document.getElementById("alert-kvitto").style.display = 'block';
    }

  }

};
