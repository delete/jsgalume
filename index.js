'use strict';

const program = require('commander');

const API = require('./lib/api.js');


program 
  .version('0.0.1')
  .usage('[options]')
  .option('-a, --artist', 'Add artist name')
  .option('-m, --music', 'Add music name')
  .option('-d, --discography', 'List the discography')
  .parse(process.argv)


var api = new API();

if ( program.artist && program.music ) {

	api.getLyrics(program.args[0], program.args[1]);

} else if ( program.artist && program.discography) {

	api.getDiscography(program.args[0]);

} else {
	console.log('Something went wrong, see --help for more information.')
}