'use strict';

var argv = require('yargs')
  .usage('Usage to get lyrics: $0 -a [artist name] -m [music name]\n' +
        'Usage to get songs list: $0 -a [artist name] -b [album name]' +
        'Usage to get discography: $0 -a [artist name] -d')
  .demand('a')
  .argv;

const API = require('./lib/api.js');


var api = new API();


if ( argv.a && argv.m ) {

  api.getLyrics(argv.a, argv.m).then(
    function (data) {
      console.log('\n\n');
      console.log('- Artista: ' + data.artist);
      console.log('- Música: ' + data.music);
      console.log('- URL: ' + data.music_url);
      console.log('\n\n -ORIGINAL:\n' + data.text);
      if (data.translate) {
        console.log('\n\n -TRANSLATE : ' + data.translate);
      }
    },
    function (err) {
      console.log(err);
    }
  );

} else if ( argv.a && argv.d) {

  api.getDiscography(argv.a).then(
    function (data) {
      for (var item of data)
        console.log(item.desc + ' - ' + item.published);
    },
    function (err) {
      console.log(err);
    }
  );

} else if ( argv.a && argv.b ) {
  
  api.getSongs(argv.a, argv.b).then(
    function (data) {
      // Remove the last char, because is a "/"
      const URL = api.MAIN_URL.slice(api.API_URL, -1)

      for (var item of data) {
        console.log(item.desc);
        console.log(URL + item.url + '\n');
      }
    },
    function (err) {
      console.log(err);
    }
  );

} else {
  console.log('Something went wrong, see --help for more information.');
}
