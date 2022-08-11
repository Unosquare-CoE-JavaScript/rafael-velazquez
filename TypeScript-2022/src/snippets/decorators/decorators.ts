
function Logger(title: string) {
    return function(constructor: Function) {
        console.log('@Logger', title);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('Template factory');
    return function<T extends {new(...args: any[]): { name: string }}>(originalConstructor: T) {
        // Runs when the class is defined
        console.log('@WithTemplate', hookId);
        return class extends originalConstructor {
            // Runs when the class is instantiated
            constructor(..._: any[]) {
                super();

                const hookEl = document.getElementById(hookId);
        
                if (hookEl) {
                    hookEl.innerHTML = template;
                    const h1Elem = hookEl.querySelector('h1')!;
                    h1Elem.textContent = h1Elem.textContent + ': ' + this.name;
                }
            }
        }
    }
}

@Logger('Person class')
@WithTemplate('<h1>My person object</h1>', 'app')
class Person {
    name = 'Rafa V';

    constructor() {
        console.log('Creating person object...');
    }
}

const person1 = new Person();
console.log(person1);