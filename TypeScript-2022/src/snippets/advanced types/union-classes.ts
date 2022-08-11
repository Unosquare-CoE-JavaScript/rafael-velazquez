class Car {
    drive() {
        console.log('Driving...');
        
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
        console.log('Loading', amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    // Type guard with classes
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(677);
    }
}

useVehicle(v1);
useVehicle(v2);