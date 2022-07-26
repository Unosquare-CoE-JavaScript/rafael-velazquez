const expect = require('chai').expect;

function promiseFn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Blah');
        }, 50);
    });
}

describe('Promise test suite', function() {
    it('Promise test', function() {
        return promiseFn().then(res => {
            expect(res).to.equal('Blah');
        });
    });
    
    it('Await test', async () => {
        var res = await promiseFn();
        expect(res).to.equal('Blah');
    });
});