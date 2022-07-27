const request = require("request");

module.exports = function getUsers(callback) {
    request.get('https://mysite.com/api/users', function(err, res) {
        callback(JSON.parse(res.body));
    });
}