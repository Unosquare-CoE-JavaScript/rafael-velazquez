class TechDepartment {
    private static instance: TechDepartment;

    private constructor(public name: string) {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new TechDepartment('Tech');
        }
        return this.instance;
    }
}

const techDept = TechDepartment.getInstance();