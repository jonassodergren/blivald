var employers = new Bloodhound({
  datumTokenizer: function (d) { return Bloodhound.tokenizers.whitespace(d.name); },
  queryTokenizer: Bloodhound.tokenizers.whitespace, //Bloodhound.tokenizers.whitespace
  // url points to a json file that contains an array of country names, see
  // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
  prefetch: {
    url: '../employers.json',
  //  filter: function(list) {
  //              return $.map(list, function(item) {
  //                  return {
  //                      name: item.name,
  //                      org: item.org,
  //                      logo: item.logo
  //                  };
  //              });
  //          },
    cache: false
  }
});

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#prefetch .form-control').typeahead({
        hint: true,
        highlight: false, /* Enable substring highlighting */
        minLength: 1 /* Specify minimum characters required for showing suggestions */
    }, {
  name: 'employers',
  source: employers,
  display: function(data) { return data.name },
  templates: {
    empty: [
      '<div class="empty-message">',
        'Hittar inga företag i vårat register. Var noga med stavningen!',
      '</div>'
    ].join('\n'),
    suggestion: function (data) {
        return '<div class="card border-bottom"><div class="card-body"><h5 class="card-title">'+data.name+'</h5><h6 class="card-subtitle mb-2 text-muted">Rekryterar just nu</h6><p class="card-text"><u><a class="button" target="_blank" href="https://allabolag.se/'+data.org+'">Mer om företaget</a></u><p></div></div>';
    }
  }
});
