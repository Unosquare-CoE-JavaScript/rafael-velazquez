function add(n1, n2) {
    return n1 + n2;
}
function addAndHandle(n1, n2, callback) {
    var result = n1 + n2;
    callback(result);
}
function showResult(num) {
    console.log(num);
}
var combineValues;
combineValues = add;
// combineValues = showResult; // compilation error
showResult(combineValues(435, 27));
addAndHandle(23, 55, function (result) {
    console.log('Res:', result);
});
