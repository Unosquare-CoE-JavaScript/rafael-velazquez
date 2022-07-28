"use strict";
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add('RF', 'Vela');
const sum = add(4, 5);
//# sourceMappingURL=function-overloads.js.map