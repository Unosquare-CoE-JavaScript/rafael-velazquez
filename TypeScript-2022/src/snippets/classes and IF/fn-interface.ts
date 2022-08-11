interface AddFn {
    (n1: number, n2:number): number;
}

const addF: AddFn = (n1: number, n2: number) => {
    return n1 + n2;
}

console.log(addF(45, 63));