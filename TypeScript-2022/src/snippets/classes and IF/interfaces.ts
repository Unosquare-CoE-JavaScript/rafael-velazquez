interface Person {
    name: string;
    age: number;
    title?: string; // Optional property

    greet(m: string): void;
}

interface Named {
    name: string;
}

interface Greetable extends Named {
    greet(m: string): void;
}

class User implements Greetable {
    constructor(public name: string) {}

    greet(msg: string) {
        console.log(msg, this.name);
    }
}

let user1: Person = {
    name: 'Rafa',
    age: 33,
    greet(msg: string) {
        console.log(msg, this.name);
    }
};

user1.greet('Hi');

let user2: Greetable;
user2 = new User('Rafa');
user2.greet('Hello');