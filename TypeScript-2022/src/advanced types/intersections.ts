type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Rafa',
    privileges: ['w', 'r'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function addNums(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);

    // Type guard
    if ('privileges' in emp) {
        console.log('Privileges', emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start date', emp.startDate);
    }
}

printEmployeeInfo(e1);