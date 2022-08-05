"use strict";
function extractAndConvert(obj, key) {
    return obj[key];
}
const value = extractAndConvert({ name: 'Max', 'age': 30 }, 'age');
console.log(value);
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('John');
textStorage.addItem('Doe');
console.log(textStorage.getItems());
textStorage.removeItem('Doe');
console.log(textStorage.getItems());
const objectStorage = new DataStorage();
const johnObj = { name: 'John' };
const maxObj = { name: 'Max' };
const doeObj = { name: 'Doe' };
objectStorage.addItem(johnObj);
objectStorage.addItem(maxObj);
objectStorage.addItem(doeObj);
objectStorage.removeItem(maxObj);
console.log(objectStorage.getItems());
//# sourceMappingURL=constraints.js.map