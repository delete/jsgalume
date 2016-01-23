'use strict';

const request = require('request');


class API{
  constructor(){
    this.API_URL = 'http://api.vagalume.com.br/search.php?';
    this.MAIN_URL = 'http://www.vagalume.com.br/'
  }

  getLyrics(artist_name, music_name) {

    let art = artist_name.replace(' ', '+');
    let mus = music_name.replace(' ', '+');
    let options = {
      url: this.API_URL + 'art='+ art +'&mus=' + mus
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

  }

  getDiscography(artist_name) {

    let art = artist_name.replace(' ', '-');

    let options = {
      url: this.MAIN_URL + art + '/discografia/index.js'
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
  }

  getSongs(artist_name, album_name) {
    let art = artist_name.replace(' ', '-');
    
    let options = {
      url: this.MAIN_URL + art + '/discografia/index.js'
    };
    
    function callback (error, res, body) {
      if ( error ) {
        console.log(error);
      } else {
        
        try {

          var response = JSON.parse(body)

        } catch (SyntaxError) {

          console.log('Artist not found!');
          process.exit(1);
        }

        var songs = [];

        for ( var item of response.discography.item ) {
          if ( item.desc === album_name ) {
            for ( var song of item.discs[0] ) {
              console.log(song.desc);
              console.log('http://vagalume.com.br' + song.url);
            }
            break;
          }
        }
      }
    }

  request(options, callback);
  }
};

module.exports = API
