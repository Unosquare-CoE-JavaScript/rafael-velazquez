"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Log(target, propertyName) {
    console.log('Property decorator', target, propertyName);
}
function LogProp(target, member, descriptor) {
    console.log('Accesor decorator');
    console.log(target);
    console.log(member);
    console.log(descriptor);
}
function LogMethod(target, method, descriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(method);
    console.log(descriptor);
}
function LogParam(target, method, position) {
    console.log('Parameter decorator');
    console.log(target);
    console.log(method);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val <= 0) {
            throw new Error('Price must be positive');
        }
    }
    get price() {
        return this._price;
    }
    getTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    LogProp
], Product.prototype, "price", null);
__decorate([
    LogMethod,
    __param(0, LogParam)
], Product.prototype, "getTax", null);
const Autobind = (_target, _method, descriptor) => {
    const originalMethod = descriptor.value;
    const edjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            console.log('binding');
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return edjDescriptor;
};
class Printer {
    constructor() {
        this.message = 'This works';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
p.showMessage();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
//# sourceMappingURL=property-decorators.js.map