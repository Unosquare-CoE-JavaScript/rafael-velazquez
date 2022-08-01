
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