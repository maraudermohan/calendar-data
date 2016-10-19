import chai from 'chai';
import chaiHttp from 'chai-http';
var expect = chai.expect;
chai.use(chaiHttp);

describe("Server Check", function() {

  describe("Catalog and BigCatalog hosted in server", function() {

    it("catalog JSON returns status 200", function(done) {
      chai.request('http://localhost:3000/catalog')
		  .get('/')
		  .end(function(err, res) {
		    expect(res).to.have.status(200);
		    done();                               
		  });
    });
    it("bigcatalog JSON returns status 200", function(done) {
      chai.request('http://localhost:3000/bigcatalog')
		  .get('/')
		  .end(function(err, res) {
		    expect(res).to.have.status(200);
		    done();                               
		  });
    });
    it("Both JSON's need to be validated against a JSONSchema");

  });
});