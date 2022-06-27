window.onload = async () => {
  let params = (new URL(document.location)).searchParams;
  let pin = params.get('pin');
  let kund = params.get('kund');
  document.getElementById("pin").value = pin;
  document.getElementById("kund").value = kund;
  window.history.replaceState({}, document.title, "/create/");

};

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

  document.body.scrollTop = 0;
  progressBar.init();

  return fetch(url,
    {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(handleErrors).then(response =>
      {
        progressBar.clear();
        var kvitto = document.getElementById("alert-kvitto");
        kvitto.style.display = 'block';

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
        var name = document.getElementById("name").value;
        var company = document.getElementById("company").value;
        var pin = document.getElementById("pin").value;
        var kund = document.getElementById("kund").value;

        notify("https://blivald-order.azurewebsites.net/api/order",{name:name,company:company,pin:pin,kund:kund});

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
