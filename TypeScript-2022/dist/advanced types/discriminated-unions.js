"use strict";
function moveAnimal(animal) {
    switch (animal.type) {
        case 'bird':
            console.log('Fying at', animal.flyingSpeed);
            break;
        case 'horse':
            console.log('Running at', animal.runningSpeed);
            break;
    }
}
moveAnimal({ type: 'bird', flyingSpeed: 80 });
moveAnimal({ type: 'horse', runningSpeed: 40 });
//# sourceMappingURL=discriminated-unions.js.map