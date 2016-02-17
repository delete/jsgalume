'use strict';

const request = require('request');


class API{
  constructor(){
    this.API_URL = 'http://api.vagalume.com.br/search.php?';
    this.MAIN_URL = 'http://www.vagalume.com.br/'
  }

  getLyrics(artist_name, music_name) {
  
    return new Promise((resolve, reject) => {
      const art = artist_name.replace(' ', '+');
      const mus = music_name.replace(' ', '+');
      const options = {
        url: this.API_URL + 'art='+ art +'&mus=' + mus
      };
      
      request(options, (err, res, body) => {
        
        if ( err ) {
          reject(err);
        } else {

          let data = JSON.parse(body);

          if ( data.type === 'song_notfound' ) {
            reject(Error('Song not found!'));

          } else if ( data.type === 'notfound' ) {
            reject(Error('Artist not found!'));

          } else {

            // If the song is in portuguese, for example, there is no translation.
            var translate;
            try {
              translate = data.mus[0].translate[0].text;
            } catch (TypeError) {
              translate = '';
            }
            const song = {
              'artist': data.art.name
            , 'music': data.mus[0].name
            , 'music_url': data.mus[0].url
            , 'text': data.mus[0].text
            , 'translate': translate
            };

            resolve(song);
          }
        }

      });
    });
  }

  getDiscography(artist_name) {
    
    return new Promise((resolve, reject) => {

      const art = artist_name.replace(' ', '-');

      const options = {
        url: this.MAIN_URL + art + '/discografia/index.js'
      };
      
      request(options, (err, res, body) => {

        if ( err ) {
          reject(err);
        } else {

          try {

            var data = JSON.parse(body);

          } catch (SyntaxError) {
            reject(Error('Artist not found!'));
          }
          
          if (typeof(data) === 'undefined') {
          
            reject(Error('Artist not found!'))
          
          } else {
          
            resolve(data.discography.item);
         
          }
        }

      });

    });
  }

  getSongs(artist_name, album_name) {

    return new Promise((resolve, reject) => {
      const art = artist_name.replace(' ', '-');

      const options = {
        url: this.MAIN_URL + art + '/discografia/index.js'
      };

      request(options, (err, res, body) => {
        if ( err ) {
          reject(err);
        } else {
          
          try {

            var data = JSON.parse(body)

          } catch (SyntaxError) {
            reject(Error('Artist not found!'));
          }

          if (typeof(data) === 'undefined') {
          
            reject(Error('Artist not found!'))
          
          } else {
            var songs = [];

            for ( var item of data.discography.item ) {
              if ( item.desc === album_name ) {
                for ( var song of item.discs[0] ) {
                  songs.push(song);
                }
                break;
              }
            }
            
            if ( songs.length > 0 ) {
              resolve(songs);
            } else {
              reject(Error('Album not found!'));
            }
          
          }
        }
      });
    });
  }

};

module.exports = API
