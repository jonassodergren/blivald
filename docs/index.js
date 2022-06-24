
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

var notify = function(url, data) {

  return fetch(url,
    {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(handleErrors).then(response => document.getElementById("alert-ok").style.display = 'block').catch((error) => {
      document.getElementById("alert-error").style.display = 'block';
    });;
  }

  function submit(){

    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(function (form) {

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      }else{
        var email = document.getElementById("email").value;
        notify("https://blivald-order.azurewebsites.net/api/Apply",{email:email});

      //  var form2 = document.getElementById("form2");
        form.classList.remove("was-validated");
        form.reset();

        window.scrollTo(0, 0);

      }
    })

    var forms2 = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.prototype.slice.call(forms2)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })


  }

  document.getElementById("notify").addEventListener("click",(event) => submit(), false);
