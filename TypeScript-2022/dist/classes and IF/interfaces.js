"use strict";
class User {
    constructor(name) {
        this.name = name;
    }
    greet(msg) {
        console.log(msg, this.name);
    }
}
let user1 = {
    name: 'Rafa',
    age: 33,
    greet(msg) {
        console.log(msg, this.name);
    }
};
user1.greet('Hi');
let user2;
user2 = new User('Rafa');
user2.greet('Hello');
//# sourceMappingURL=interfaces.js.map