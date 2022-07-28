// Discriminated unions pattern

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    switch (animal.type) {
        case 'bird':
            console.log('Fying at', animal.flyingSpeed);
            break;
        case 'horse':
            console.log('Running at', animal.runningSpeed);
            break;
    }
}

moveAnimal({type: 'bird', flyingSpeed: 80});
moveAnimal({type: 'horse', runningSpeed: 40});