
(function(){

document.body.className = 'redirecting';

var slug = location.pathname.slice(1);
// hash.indexOf('https') == 0? hash :
var url = 'https://www.blivald.se/' + 'verify.html';

if (slug === "verify")
url = 'https://www.blivald.se/' + 'verify.html';
else{
  url = 'https://www.blivald.se/error.html?errorCode=404'
}

location.href = url;

})();
