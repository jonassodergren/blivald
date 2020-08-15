let auth0 = null;
let order_id = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    redirect_uri: window.location.origin + "/create.html"
  });
};

window.onload = async () => {

//window.history.replaceState({}, document.title, "/create/");

  //Add sessionId

  if(sessionStorage['transactionId'] === null || sessionStorage['transactionId'] === undefined)
  sessionStorage['transactionId'] = newGuid();

  console.log(sessionStorage['transactionId']);

  await configureClient();
  // NEW - update the UI state
  updateUI();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // show the gated content
    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/create/");
  }
};

function newGuid() {
    var guidHolder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    var hex = "0123456789abcdef";
    var r = 0;
    var guidResponse = "";

    for (var i = 0; i < 36; i++) {
        if (guidHolder[i] !== "-" && guidHolder[i] !== "4") {
            // each x and y needs to be random
            r = (Math.random() * 16) | 0;
        }

        if (guidHolder[i] === "x") {
            guidResponse += hex[r];
        } else if (guidHolder[i] === "y") {
            // clock-seq-and-reserved first hex is filtered and remaining hex values are random
            r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
            r |= 0x8; // set pos 3 to 1 as 1???
            guidResponse += hex[r];
        } else {
            guidResponse += guidHolder[i];
        }
    }

    return guidResponse;
}

const sendCertificate = async () => {
  var email = document.getElementById("email").value;
  var firstname = document.getElementById("firstname_input").value;
  var lastname = document.getElementById("lastname_input").value;
  var company = document.getElementById("company").value;
  var mode = sessionStorage["Mode"];


  var form = document.getElementById("certificate-form");

  if (form.checkValidity() === false){

    $('#message').html('<div id="alert" class="alert alert-warning alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Nu blev det lite galet!</strong> Företag och förnamn måste vara ifyllda för att kunna gå vidare</div>');

    setTimeout(function() {
      $('#alert').hide();
    }, 5000);
    return;
  }

  var transactionId = sessionStorage['transactionId'];

//  $.ajaxSetup({
//    headers: {
//    "TransactionUid": transationId
//    }
//  });

  var transationId = newGuid();
  // https://softwhere.ddns.net/woc
  $.ajax({
    type: "POST",
    url: "https://api.blivald.se/certificates",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({email: email, firstname: firstname, type: mode, lastname: lastname, company: company}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
    "TransactionUid": transactionId
    },
    success: function(data){
      setTimeout(function(){
        $.LoadingOverlay("hide");
        window.location = '/confirmation.html?email='+email+'&order_id='+data.id;
      }, 3000);
      console.log(data);
    },
    error: function(errMsg) {
      //$.LoadingOverlay("hide");
      window.location = '/error.html?errorCode=' + JSON.parse(errMsg.responseText).httpStatusCode;
    },
    complete: function(msg){

    }
  });
}

// NEW
const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  //document.getElementById("btn-logout").disabled = !isAuthenticated;
  //document.getElementById("btn-login").disabled = isAuthenticated;

  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    //  document.getElementById("gated-content").classList.remove("hidden");
    //document.getElementById("gated-content").classList.add("hidden");

    //  document.getElementById(
    //    "ipt-access-token"
    //  ).innerHTML = await auth0.getTokenSilently();

    user = await auth0.getUser();

    //  document.getElementById("ipt-user-profile").textContent = JSON.stringify(
    //    user
    //  );

    //  $("#signup-form").steps("next");

    $("#firstname_input").click();
    //  $("#lastname_input").focus();
    //  $("#email").focus();

    //document.getElementById("firstname_label").innerText = '';
    document.getElementById("firstname_input").value = user.given_name;
    //document.getElementById("lastname_label").innerText = '';
    document.getElementById("lastname_input").value = user.family_name;
    document.getElementById("lastname_input").readOnly = true;
    document.getElementById("email").value = user.email;
    document.getElementById("email").readOnly = true;

  } else {

  }
};

const cancel = async () => {
  logout();
  //  updateUI();
}

const login = async () => {
  var company = document.getElementById("company").value;
  var url = "/create.html";
  if(company !== null)
  url += "?" + "company="+company;
  const encoded = encodeURI(url);
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin + encoded
  });
};

const demo = () => {
// Set demo mode
sessionStorage["Mode"] = "Demo";
login();
};

const create = () => {
// Set demo mode
sessionStorage["Mode"] = "Live";
login();
};

const logout = () => {
  auth0.logout({
    returnTo: "/"
  });
};

//$(document).ajaxStart(function(){
  // set overlay
//  $.LoadingOverlay("show", {
//    background  : "rgba(92, 184, 92, 0.4)"
//  });
//});

//$(document).ajaxStart(function(){
  //$.LoadingOverlay("show");
  // $("#content").LoadingOverlay
//  $(#certificate-form).LoadingOverlay("show", {
//    background  : "rgba(92, 184, 92, 0.4)"
//  });
//});
//$(document).ajaxStop(function(){
//  $.LoadingOverlay("hide");
//});
