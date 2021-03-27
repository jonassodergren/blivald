

$(document).on("adduserinfo", function(e, email, api_key){
    //var email = document.getElementById("email").value;

    //if(email === 'undefined')
    //return;

    $.ajax({
      type: "GET",
      url: "https://api.blivald.se/user/?user="+email,
      // The key needs to match your method's input parameter (case-sensitive).
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
      "Api-Key": api_key
      },
      success: function(data){
        var allowedcertificates = data.allowedtypeofcertificates;
        console.log(data);
        if (!allowedcertificates.includes(sessionStorage["Mode"].toLowerCase())){
          console.log("Not allowed to create");
          $('#demo').html('<div id="alert" class="alert alert-warning alert-dismissible show" role="alert">Du har redan använt upp din quota av certifikat. Så just nu kan du inte skapa ett till certifikat</div>');
          var button = document.getElementById("submitCertificate");
          button.disabled = true;
        }else{
          $('#demo').html('<div id="alert" class="alert alert-warning alert-dismissible show" role="alert"><strong>'+email+'</strong> kan skapa ett kostnadsfritt certifikat</div>');

        }
      },
      error: function(errMsg) {
        // Let server decide what to do
      },
      complete: function(msg){

      }
    });

});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';

  // changed to on from load
  window.addEventListener('load', async function() {


      let params = (new URL(document.location)).searchParams;
      let company = params.get('company');
      document.getElementById("company").value = company;

    // Check business rules, is it possible to create a cert

    var allowedcertificates = [];

    // Show if in demo mode
    var mode = sessionStorage["Mode"];
    if (mode === 'Demo')
    $('#demo').html('<div id="alert" class="alert alert-warning alert-dismissible show" role="alert">Demo - Riskfritt att prova och trycka!</div>');

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //var forms = document.getElementsByClassName('needs-validation'); //certificate-form
    var forms = document.getElementById("certificate-form");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

  }, false);
})();
