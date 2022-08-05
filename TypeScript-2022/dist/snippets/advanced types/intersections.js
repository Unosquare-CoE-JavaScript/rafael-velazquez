"use strict";
const e1 = {
    name: 'Rafa',
    privileges: ['w', 'r'],
    startDate: new Date()
};
function addNums(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInfo(emp) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges', emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start date', emp.startDate);
    }
}
printEmployeeInfo(e1);
//# sourceMappingURL=intersections.js.map