"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function addAndHandle(n1, n2, callback) {
    const result = n1 + n2;
    callback(result);
}
function showResult(num) {
    console.log(num);
}
let combineValues;
combineValues = add;
// combineValues = showResult; // compilation error
showResult(combineValues(435, 27));
addAndHandle(23, 55, (result) => {
    console.log('Res:', result);
});
