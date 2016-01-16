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

  api.getLyrics(argv.a, argv.m);

} else if ( argv.a && argv.d) {

  api.getDiscography(argv.a);

} else if ( argv.a && argv.b ) {
  
  api.getSongs(argv.a, argv.b);

} else {
  console.log('Something went wrong, see --help for more information.');
}
