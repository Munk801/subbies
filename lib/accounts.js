var request = require('request');
var Client = require('node-rest-client').Client;

var create = function() {
};

var get = function() {
	// Test authentication
	var authArgs = {user: "munk801@gmail.com", password: "$altLak3"};
	client = new Client(authArgs);
	args = {};
	url = "https://apisandbox-api.zuora.com/rest/v1/accounts/A00000001";
	client.get(url, args, function(data, response) {
		console.log(data);
		// console.log(response);
	});
};

module.exports = get;