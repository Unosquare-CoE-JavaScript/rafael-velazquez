
type Combinables = string | number;

function adds(a: number, b: number): number;
function adds(a: string, b: string): string;
function adds(a: Combinables, b: Combinables) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const result = adds('RF', 'Vela');
const sum = adds(4, 5);