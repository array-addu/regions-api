let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);


describe('GET /list?q=Asia', () => {
    it('it should fetch countries list of Asia', ( done ) => {
 
       chai.request( 'http://localhost:3000' )
           .get( "/list" )
           .query({q: 'Asia'})
           .end( ( err, res ) => {
             if( err ) { return done( err );}
             res.should.have.status(200);
             res.should.be.a('object');
             res.body.should.have.property('data');
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
             res.should.be.a('object');
             res.body.should.have.property('data');
             done();
           });
       //done();
     });
  });

  describe('GET /list?q=Australi', () => {
    it('it should not fetch countries list of Australia', ( done ) => {
 
       chai.request( 'http://localhost:3000' )
           .get( "/list" )
           .query({q: 'Australia'})
           .end( ( err, res ) => {
             if( err ) { return done( err );}
             res.should.have.status(200);
             res.should.be.a('object');
             res.body.should.have.property('data');
             done();
           });
       //done();
     });
  });