function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

const value = extractAndConvert({name: 'Max', 'age': 30}, 'age');
console.log(value);


class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

// Using string
const textStorage = new DataStorage<string>();
textStorage.addItem('John');
textStorage.addItem('Doe');
console.log(textStorage.getItems());
textStorage.removeItem('Doe');
console.log(textStorage.getItems());

// Using objects
const objectStorage = new DataStorage<object>();
const johnObj = {name: 'John'};
const maxObj = {name: 'Max'};
const doeObj = {name: 'Doe'};

objectStorage.addItem(johnObj);
objectStorage.addItem(maxObj);
objectStorage.addItem(doeObj);
objectStorage.removeItem(maxObj);
console.log(objectStorage.getItems());
