"use strict";
function adds(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = adds('RF', 'Vela');
const sum = adds(4, 5);
//# sourceMappingURL=function-overloads.js.map