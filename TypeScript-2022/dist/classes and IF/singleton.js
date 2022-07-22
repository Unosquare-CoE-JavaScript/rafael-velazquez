"use strict";
class TechDepartment {
    constructor(name) {
        this.name = name;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new TechDepartment('Tech');
        }
        return this.instance;
    }
}
const techDept = TechDepartment.getInstance();
//# sourceMappingURL=singleton.js.map