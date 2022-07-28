
type Combinables = string | number;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinables, b: Combinables) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const result = add('RF', 'Vela');
const sum = add(4, 5);