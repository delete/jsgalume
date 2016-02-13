'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const API = require('./../lib/api')

chai.use(chaiAsPromised);


describe('Test API responses', function () {
  
  const api = new API();

  describe('Test getLyrics', function () {

    it('Must return the right artist name', function () {
      const expected = 'Pearl Jam';

      var result = api.getLyrics('Pearl Jam', 'Last Kiss');

      return expect(result.then( obj => obj.artist )).to.eventually.equal(expected);
    });

    it('Must return a message error: Artist not found!', function () {
      const expected = 'Artist not found!';

      var result = api.getLyrics('Pel Jam', 'Last Kiss');

      return expect(result).to.be.rejectedWith(expected);
    });

    it('Must return a message error: Song not found!', function () {
      const expected = 'Song not found!';

      var result = api.getLyrics('Pearl Jam', 'blabla');

      return expect(result).to.be.rejectedWith(expected);
    });
  });

  describe('Test getDiscography', function () {

    it('Must return the right amount of albums', function () {
      const expected = 15;

      var result = api.getDiscography('Pearl Jam');

      return expect(result.then( obj => obj.length )).to.eventually.equal(expected)
    });
    
    it('Must return a message error: Artist not found!', function () {      
      const expected = 'Artist not found!';

      var result = api.getDiscography('Pel Jam');

      return expect(result).to.be.rejectedWith(expected);
    });
  });

  describe('Test getSongs', function () {

    it('Must return the right amount of songs', function () {
      const expected = 11;

      var result = api.getSongs('Pearl Jam', 'Ten');

      return expect(result.then( obj => obj.length )).to.eventually.equal(expected);
    });

    it('Must return a message error: Artist not found!', function () {      
      const expected = 'Artist not found!';

      var result = api.getSongs('Pel Jam', 'Ten');

      return expect(result).to.be.rejectedWith(expected);
    });

    it('Must return a message error: Album not found!', function () {      
      const expected = 'Album not found!';

      var result = api.getSongs('Pearl Jam', 'blabla');

      return expect(result).to.be.rejectedWith(expected);
    });
  });

});
