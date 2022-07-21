var Role;
(function (Role) {
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["VIEWER"] = 2] = "VIEWER";
    Role[Role["WRITER"] = 3] = "WRITER";
})(Role || (Role = {}));
var person = {
    name: 'Rafa V',
    age: 32,
    hobbies: ['Sports', 'Traveling'],
    role: [2, Role.ADMIN]
};
console.log(person.role);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
