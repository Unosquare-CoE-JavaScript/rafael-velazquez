type NumOrStr = number | string;
type RetType = 'num' | 'str';

function combine(n1: NumOrStr, n2: NumOrStr, t: RetType) {
    if (t === 'num') {
        return +n1 + +n2;
    }
    return n1.toString() + n2.toString();
}

const res = combine(34, 56, 'num');
const res2 = combine('Raf', 'Vel', 'str');

console.log(res);
console.log(res2);

