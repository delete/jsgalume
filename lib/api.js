'use strict';

const request = require('request');


const MAIN_URL = 'http://api.vagalume.com.br/search.php?'


function API () {};


API.prototype.getLyrics = function (artist_name, music_name) {

  let art = artist_name.replace(' ', '+');
  let mus = music_name.replace(' ', '+');
  let options = {
    url: MAIN_URL + 'art='+ art +'&mus=' + mus
  };

  function callback( error, res, body ) {
    if ( error ) {
      console.log(error);
    } else {

      let response = JSON.parse(body);

      if ( response.type === 'song_notfound' ) {

      console.log('Song not found!');
      process.exit(1);

      } else if ( response.type === 'notfound' ) {

        console.log('Artist not found!');
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

API.prototype.getDiscography = function (artist_name) {

  let art = artist_name.replace(' ', '-');

  let options = {
    url: 'http://www.vagalume.com.br/' + art + '/discografia/index.js'
  };

  function callback (error, res, body) {
    if ( error ) {
      console.log(error);
    } else {

      try {

        var response = JSON.parse(body);

      } catch (SyntaxError) {

        console.log('Artist not found!');
        process.exit(1);
      }

      for(var item of response.discography.item){
        console.log(item.desc);
      }
    }
  };

  request(options, callback);
};


module.exports = API