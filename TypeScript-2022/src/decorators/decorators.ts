
function Logger(title: string) {
    return function(constructor: Function) {
        console.log('@Logger', title);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        console.log('@WithTemplate', hookId);
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            const h1Elem = hookEl.querySelector('h1')!;
            h1Elem.textContent = h1Elem.textContent + ': ' + p.name;
        }
    }
}

@Logger('Person class')
@WithTemplate('<h1>My person object</h1>', 'app')
class Person {
    name = 'Rafa';

    constructor() {
        console.log('Creating person object...');
    }
}

const person1 = new Person();
console.log(person1);

