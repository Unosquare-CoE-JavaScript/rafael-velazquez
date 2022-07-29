"use strict";
const names = [];
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Job is Done');
    }, 100);
});
promise.then(data => {
    console.log(data.split(' '));
});
function merge(objA, objB) {
    return { ...objA, ...objB };
}
const mergedObj = merge({ name: 'Rafa', hobbies: ['Sports'] }, { age: 30 });
console.log('Name', mergedObj.name);
console.log('Hobbies', mergedObj.hobbies);
console.log('Age', mergedObj.age);
function countAndDescribe(element) {
    let desc = 'Got no value';
    if (element.length > 0) {
        desc = `Got ${element.length} elements`;
    }
    return [element, desc];
}
console.log(countAndDescribe('Test text'));
console.log(countAndDescribe(['John', 'Doe']));
//# sourceMappingURL=generics.js.map