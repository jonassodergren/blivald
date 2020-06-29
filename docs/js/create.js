

$(document).ajaxStart(function(){
  // set overlay
  var overlayElement = $('#selectCompany');
  overlayElement.LoadingOverlay("show", {
    background  : "rgba(92, 184, 92, 0.4)",
//    image       : ""
//    text        : "Snart klar!..."
  });
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';

  window.addEventListener('load', function() {


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