const expect = require('chai').expect;
const fizzBuzz = require('../FizzBuzz');

describe('FizzBuzz test suite', function() {
    before(function() {
        console.log('Before tests');
    });

    beforeEach(function() {
        console.log('Before each');
    });

    describe('Numbers', function() {
        it('Expects 1 when 1 is passed in', function() {
            const result = fizzBuzz(1);
            expect(result).to.equal('1');
        });
        
        it('Expects 2 when 2 is passed in', function() {
            const result = fizzBuzz(2);
            expect(result).to.equal('2');
        });
    });
    
    describe('Words', function() {
        it('Expects Fizz when 3 is passed in', function() {
            const result = fizzBuzz(3);
            expect(result).to.equal('Fizz');
        });
        
        it('Expects Buzz when 5 is passed in', function() {
            const result = fizzBuzz(5);
            expect(result).to.equal('Buzz');
        });
        
        it('Expects FizzBuzz when 5 is passed in', function() {
            const result = fizzBuzz(15);
            expect(result).to.equal('FizzBuzz');
        });
    });

    afterEach(function() {
        console.log('After each');
    });
    
    after(function() {
        console.log('After tests');
    });
});