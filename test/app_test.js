'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


describe('GET /list?q=Asia', () => {
  it('it should fetch countries list of Asia', ( done ) => {

     chai.request( 'http://localhost:3000' )
         .get( "/list" )
         .query({q: 'Asia'})
         .end( ( err, res ) => {
           if( err ) { return done( err );}
           res.should.have.status(200);
           done();
         });
     //done();
   });
});
describe('GET /list?q=Africa', () => {
  it('it should fetch countries list of Africa', ( done ) => {

     chai.request( 'http://localhost:3000' )
         .get( "/list" )
         .query({q: 'Africa'})
         .end( ( err, res ) => {
           if( err ) { return done( err );}
           res.should.have.status(200);
           done();
         });
     //done();
   });
});

describe('GET /list?q=Australia', () => {
  it('it should not fetch countries list of Australia', ( done ) => {

     chai.request( 'http://localhost:3000' )
         .get( "/list" )
         .query({q: 'Australia'})
         .end( ( err, res ) => {
           if( err ) { return done( err );}
           res.should.have.status(200);
           done();
         });
     //done();
   });
});


describe('GET /list/Asia/sort', () => {
  it('it should sort country list according to population of region Asia', ( done ) => {

     chai.request( 'http://localhost:3000' )
         .get( "/list/:region/sort" )
         .send({ region: 'Asia'})
         .end( ( err, res ) => {
           if( err ) { return done( err );}
           res.should.have.status(200);
           done();
         });
     //done();
   });
});

describe('GET /list/Asia/sort', () => {
  it('it should sort country list according to population of region Africa', ( done ) => {

     chai.request( 'http://localhost:3000' )
         .get( "/list/:region/sort" )
         .send({ region: 'Africa'})
         .end( ( err, res ) => {
           if( err ) { return done( err );}
           res.should.have.status(200);
           done();
         });
     //done();
   });
});

