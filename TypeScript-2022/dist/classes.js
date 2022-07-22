"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log('Describe', this.id, this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployees() {
        console.log(this.employees);
    }
}
Department.fiscalYear = 2022;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = [];
        this.admins = admins;
    }
    get lastAdmin() {
        if (this.admins.length === 0) {
            throw 'Not found';
        }
        return this.admins[this.admins.length - 1];
    }
    set lastAdmin(n) {
        this.admins.push(n);
    }
}
console.log('Static fiscal year:', Department.fiscalYear);
const accounting = new Department('ACC', 'Accounting');
accounting.describe();
accounting.addEmployee('Rafa');
accounting.addEmployee('Max');
accounting.printEmployees();
const accoCopy = { describe: accounting.describe };
const accoCopy2 = { name: 'HR', enabled: true, describe: accounting.describe };
const itDepartment = new ITDepartment('TI', []);
itDepartment.addEmployee('VELA');
itDepartment.describe();
try {
    const lastAdmin = itDepartment.lastAdmin;
    console.log(lastAdmin);
}
catch (e) {
    console.log(e);
}
itDepartment.lastAdmin = 'RAFA V';
console.log('Last admin', itDepartment.lastAdmin);
//# sourceMappingURL=classes.js.map