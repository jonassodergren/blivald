
(function(){

var loc = window.location.href;
loc = loc.lastIndexOf('/') == loc.length - 1 ? loc.substr(0, loc.length - 1) : loc.substr(0, loc.length + 1);
var pathname = loc.substr(loc.lastIndexOf('/') + 1);

if (pathname === "verify")
url = 'https://www.blivald.se/' + 'verify.html';
else{
  url = 'https://www.blivald.se/error.html?errorCode=404'
}

location.href = url;

})();
