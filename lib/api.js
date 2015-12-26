'use strict';

const request = require('request');


function API () {
  this.MAIN_URL = 'http://api.vagalume.com.br/search.php?'
};


API.prototype.getLyrics = function (artist_name, music_name) {

  let options = {
  url: this.MAIN_URL + 'art='+ artist_name +'&mus=' +music_name
};

function callback( error, res, body ) {
  if ( error ) {
    console.log(error);
  } else {

    let response = JSON.parse(body);

    if ( response.type === 'song_notfound' ) {

    console.log('Song not found!');
    proccess.exit(1);

    } else if ( response.type === 'notfound' ) {

      console.log('Artist not found!')
      process.exit(1);

    } else {

      // If the song is in portuguese, for example, there is no translation.
      try {
        var translate = response.mus[0].translate[0].text;
      } catch (TypeError) {
        var translate = '';
      }

      let song = {
         'artist': response.art.name
        , 'music': response.art.url
        , 'music_url': response.mus[0].url
        , 'text': response.mus[0].text
        , 'translate': translate
      };

      console.log(song);
    }
  }
};

  request(options, callback);

};


//module.exports = API
var api = new API();
api.getLyrics('pearl+jam', 'last+kiss');