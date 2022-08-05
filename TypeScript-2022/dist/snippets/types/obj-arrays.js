"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["VIEWER"] = 2] = "VIEWER";
    Role[Role["WRITER"] = 3] = "WRITER";
})(Role || (Role = {}));
const person = {
    name: 'Rafa V',
    age: 32,
    hobbies: ['Sports', 'Traveling'],
    role: [2, Role.ADMIN]
};
console.log(person.role);
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
const hobby1 = person?.hobbies?.[1] ?? 'none';
console.log(hobby1);
//# sourceMappingURL=obj-arrays.js.map