enum Role {
    ADMIN = 1,
    VIEWER = 2,
    WRITER = 3
}

const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, Role];
} = {
    name: 'Rafa V',
    age: 32,
    hobbies: ['Sports', 'Traveling'],
    role: [2, Role.ADMIN]
};

console.log(person.role);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}