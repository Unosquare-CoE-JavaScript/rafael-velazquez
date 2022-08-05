class Department {
    // private id: string;
    // private name: string;
    private employees: string[] = [];
    static fiscalYear = 2022;

    // Shortcut for members creation and initialization
    constructor(private readonly id: string, private name: string) {
        // this.id = id;
        // this.name = name;
    }

    describe(this: Department) {
        console.log('Describe', this.id, this.name);
    }

    addEmployee(employee: string) {
        // this.id = 'MOD'; // Compilation error
        this.employees.push(employee);
    }

    printEmployees() {
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    public admins: string[] = [];

    get lastAdmin() {
        if (this.admins.length === 0) {
            throw 'Not found';
        }
        return this.admins[this.admins.length - 1];
    }

    set lastAdmin(n: string) {
        this.admins.push(n);
    }

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
}

console.log('Static fiscal year:', Department.fiscalYear);

const accounting = new Department('ACC', 'Accounting');
accounting.describe();
accounting.addEmployee('Rafa');
accounting.addEmployee('Max');
accounting.printEmployees();

const accoCopy = { describe: accounting.describe }
// accoCopy.describe(); // Compilation error

const accoCopy2 = { name: 'HR', enabled: true, describe: accounting.describe }
// accoCopy2.describe();

const itDepartment = new ITDepartment('TI', []);
itDepartment.addEmployee('VELA');
itDepartment.describe();

try {
    const lastAdmin = itDepartment.lastAdmin;
    console.log(lastAdmin);
} catch (e) {
    console.log(e);
}

itDepartment.lastAdmin = 'RAFA V';
console.log('Last admin', itDepartment.lastAdmin);
