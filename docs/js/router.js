
(function(){

document.body.className = 'redirecting';

var slug = location.pathname.slice(1);
// hash.indexOf('https') == 0? hash :
var url = 'https://www.blivald.se/' + 'verify.html';
location.href = url;


})();
