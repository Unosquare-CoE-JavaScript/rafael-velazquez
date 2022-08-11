const expect = require('chai').expect;

function myAsyncFunction(callback) {
    setTimeout(() => {
        callback('Ok');
    }, 100);
}

describe('Async test suite', function() {
    it('SetTimeout test', function(done) {
        myAsyncFunction(function(str) {
            expect(str).to.equal('Ok');
            done();
        });
    });
});