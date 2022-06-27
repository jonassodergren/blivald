
(function(){

  var url = "https://www.blivald.se/"

  var loc = window.location.href;
  loc = loc.lastIndexOf('/') == loc.length - 1 ? loc.substr(0, loc.length - 1) : loc.substr(0, loc.length + 1);
  var pathname = loc.substr(loc.lastIndexOf('/') + 1);
  var query = window.location.search;

  if (pathname === "verify"){
    //Many problems with this route/hack
    //TODO: Fix it
    url = url + 'verify.html';
  }
  else if(pathname === "create"){
    url = url + 'select.html'+query;
  }
  else{
    url = url + 'error.html?errorCode=404';
  }

  location.href = url;

})();
