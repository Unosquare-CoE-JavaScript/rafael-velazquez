
function Log(target: any, propertyName: string) {
    console.log('Property decorator', target, propertyName);
}

function LogProp(target: any, member: string, descriptor: PropertyDescriptor) {
    console.log('Accesor decorator');
    console.log(target);
    console.log(member);
    console.log(descriptor);
}

function LogMethod(target: any, method: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(method);
    console.log(descriptor);
}

function LogParam(target: any, method: string | Symbol, position: number) {
    console.log('Parameter decorator');
    console.log(target);
    console.log(method);
    console.log(position);
}

class Product {
    // Property decorator
    @Log
    title: string;
    private _price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    // Accesor decorator
    @LogProp
    set price(val: number) {
        if (val <= 0) {
            throw new Error('Price must be positive');
        }
    }

    get price() {
        return this._price;
    }

    // Method decorator / Parameter decorator
    @LogMethod
    getTax(@LogParam tax: number) {
        return this._price * (1 + tax);
    }
}

const Autobind = (_target: any, _method: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const edjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            console.log('binding');
            // this refers to the class instance
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return edjDescriptor;
}

class Printer {
    message = 'This works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage.bind(p))
button.addEventListener('click', p.showMessage);
