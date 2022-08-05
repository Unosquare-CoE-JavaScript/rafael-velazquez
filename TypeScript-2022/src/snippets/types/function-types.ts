function add(n1: number, n2:number) {
    return n1 + n2;
}

function addAndHandle(n1:number, n2: number, callback: (n: number) => void) {
    const result = n1 + n2;
    callback(result);
}

function showResult(num: number) {
    console.log(num);
}

let combineValues: (n: number, m: number) => number;

combineValues = add;
// combineValues = showResult; // compilation error

showResult(combineValues(435, 27));

addAndHandle(23, 55, (result) => {
    console.log('Res:', result);
});