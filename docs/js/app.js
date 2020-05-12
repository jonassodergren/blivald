let auth0 = null;
let order_id = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

window.onload = async () => {
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
    window.history.replaceState({}, document.title, "/");
  }
};

const sendCertificate = async () => {
  var email = document.getElementById("email").value;
  var firstname = document.getElementById("firstname_input").value;
  var lastname = document.getElementById("lastname_input").value;
  var company = document.getElementById("company").value;

 // https://softwhere.ddns.net/woc
  $.ajax({
    type: "POST",
    url: "https://api.blivald.se/woc",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({email: email, firstname: firstname, lastname: lastname, company: company}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      window.location = 'confirmation.html?email='+email+'&order_id='+data.id;
    },
    error: function(errMsg) {
      alert(JSON.parse(errMsg.responseText).errorMessage);
    },
    complete: function(msg){
      //    $("#exampleModalCenter").modal("hide");
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

    $("#firstname_input").focus();
    $("#lastname_input").focus();
    $("#email").focus();

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
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin + "/create.html"
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};
