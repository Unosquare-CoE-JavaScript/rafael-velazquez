function combine(n1, n2, t) {
    if (t === 'num') {
        return +n1 + +n2;
    }
    return n1.toString() + n2.toString();
}
var res = combine(34, 56, 'num');
var res2 = combine('Raf', 'Vel', 'str');
console.log(res);
console.log(res2);
