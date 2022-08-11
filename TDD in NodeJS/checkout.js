
module.exports = class Checkout {
    constructor() {
        this.prices = {};
        this.items = {};
        this.discounts = {};
        this.total = 0;
    }

    addItemPrice(item, price) {
        this.prices[item] = price;
    }

    addItem(item) {
        if (this.prices[item] == undefined) {
            throw('No proce defined for item: ' + item);
        }

        if (this.items[item] == undefined) {
            this.items[item] = 1;
        } else {
            this.items[item]++;
        }
    }

    calculateDiscount(item, qty, discount) {
        let total = 0;

        const itemsWithoutDiscount = qty % discount.qty;
        const numOfDiscounts = qty - itemsWithoutDiscount;
        
        total += numOfDiscounts * (discount.price / discount.qty);
        total += itemsWithoutDiscount * this.prices[item];

        return total;
    }

    calculateItemTotal(item) {
        let total = 0;
        const discount = this.discounts[item];
        if (discount) {
            total += this.calculateDiscount(item, this.items[item], discount);
        } else {
            total += this.prices[item] * this.items[item];
        }

        return total;
    }

    calculateTotal() {
        let total = 0;

        for (const item in this.items) {
            total += this.calculateItemTotal(item);
        }

        return total;
    }

    addDiscount(item, qty, discountPrice) {
        this.discounts[item] = {qty: qty, price: discountPrice};
    }
}