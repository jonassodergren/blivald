class ProgressBar {

  constructor(progressbar){
    this.progressBar = progressbar;    // Progress Bar
    this.progress = 0;                 // Tracking Progress
  }
  init(){
    const context = this;   // Reference to the instantiated object.
    this.myVar = setInterval(myTimer, 50);
    function myTimer() {
      context.changeProgress();
    }
  }
  clear(){
    clearInterval(this.myVar);
    this.progressBar.style.width = 0 + '%';
  }
  changeProgress(){
    this.progress = this.progress + 1;
    this.progressBar.style.width = this.progress + '%';
  //  this.progressBar.setAttribute('aria-valuenow', this.progress);
  }
}

const progressBar = new ProgressBar(
  // passing in reference to progress-bar div
  document.querySelector('.progress-bar')
);


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

var notify = function(url, data) {

  window.scrollTo(-400, 0);
  progressBar.init();

  return fetch(url,
    {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(handleErrors).then(response =>
      {
        progressBar.clear();
        document.getElementById("alert-ok").style.display = 'block';
      }).catch((error) => {
      progressBar.clear();
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
