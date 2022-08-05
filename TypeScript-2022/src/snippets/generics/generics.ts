const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Job is Done');
    }, 100);
});

promise.then(data => {
    console.log(data.split(' '));
});


// Generic types

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return {...objA, ...objB};
}

type ObjA = {
    name: string;
    hobbies: string[]
}
type ObjB = {
    age: number;
}

const mergedObj = merge({name: 'Rafa', hobbies: ['Sports']}, {age: 30});
console.log('Name', mergedObj.name);
console.log('Hobbies', mergedObj.hobbies);
console.log('Age', mergedObj.age);


// Another generic function

interface HasLength {
    length: number;
}

function countAndDescribe<T extends HasLength>(element: T) {
    let desc = 'Got no value';
    if (element.length > 0) {
        desc = `Got ${element.length} elements`;
    }
    return [element, desc];
}

console.log(countAndDescribe('Test text'));
console.log(countAndDescribe(['John', 'Doe']));
