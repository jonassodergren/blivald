
(function(){

var url = "https://www.blivald.se/"

var loc = window.location.href;
loc = loc.lastIndexOf('/') == loc.length - 1 ? loc.substr(0, loc.length - 1) : loc.substr(0, loc.length + 1);
var pathname = loc.substr(loc.lastIndexOf('/') + 1);

if (pathname === "verify")
url = url + 'verify.html';
else{
  url = url + 'error.html?errorCode=404';
}

location.href = url;

})();
