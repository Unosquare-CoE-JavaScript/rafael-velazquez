"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(title) {
    return function (constructor) {
        console.log('@Logger', title);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log('Template factory');
    return function (originalConstructor) {
        console.log('@WithTemplate', hookId);
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    const h1Elem = hookEl.querySelector('h1');
                    h1Elem.textContent = h1Elem.textContent + ': ' + this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Rafa V';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger('Person class'),
    WithTemplate('<h1>My person object</h1>', 'app')
], Person);
const person1 = new Person();
console.log(person1);
//# sourceMappingURL=decorators.js.map