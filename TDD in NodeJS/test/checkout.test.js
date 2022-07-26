const expect = require('chai').expect;
const Checkout = require('../checkout');

let checkout;

beforeEach(function() {
    checkout = new Checkout();
    checkout.addItemPrice('Prod 1', 100);
    checkout.addItemPrice('Prod 2', 60);
});

describe('Checkout tests', function() {
    it('Can calculate current total', function() {
        checkout.addItem('Prod 1');
        expect(checkout.calculateTotal()).to.equal(100);
    });

    it('Can add multiple items and get the correct total', function() {
        checkout.addItem('Prod 1');
        checkout.addItem('Prod 2');
        expect(checkout.calculateTotal()).to.equal(160);
    });

    it('Can add discount rule', function() {
        checkout.addDiscount('Prod 1', 3, 200);
    });

    it ('Can add discount rules to the total', function() {
        checkout.addDiscount('Prod 1', 3, 200);
        checkout.addItem('Prod 1');
        checkout.addItem('Prod 1');
        checkout.addItem('Prod 1');
        checkout.addItem('Prod 1');
        checkout.addItem('Prod 2');
        expect(checkout.calculateTotal()).to.equal(360);
    });

    it('Throws if a product is added without price', function() {
        expect(function() {
            checkout.addItem('Product 4');
        }).to.throw();
    });
});