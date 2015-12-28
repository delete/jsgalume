'use strict';

const program = require('commander');

const API = require('./lib/api.js');


program 
  .version('0.0.1')
  .usage('[options]')
  .option('-a, --artist', 'Add artist name')
  .option('-m, --music', 'Add music name')
  .parse(process.argv)


if ( program.artist && program.music ) {
	
	let api = new API();
	api.getLyrics(program.args[0], program.args[1]);

} else {
	console.log('Something went wrong, see --help for more information.')
}