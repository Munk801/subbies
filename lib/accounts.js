var request = require('request');
var Client = require('node-rest-client').Client;

var create = function() {
	// Credit card info should not be sent through API
	var testCreditCard = {
		cardType : "Visa",
		expirationMonth : 2,
		securityCode : "111",
		cardNumber : "4111111111111111",
		expirationYear : 2016

	};
	var testBillToContact = {
		country : "USA",
		lastName : "Ford",
		firstName : "Harrison",
		workEmail : "han@solo.com",
		address1 : "123 Corellia St",
		city : "San Francisco",
		state : "California",
	};
	var testAccount = {
		billCycleDay : "30",
		name : "test",
		currency : "USD",
		billToContact : testBillToContact,
		creditCard : testCreditCard
	};
	// Test authentication
	var authArgs = {user: "munk801@gmail.com", password: "$altLak3"};
	client = new Client(authArgs);
	args = {
		data: testAccount,
		headers: {"Content-Type" : "application/json"}
	};
	url = "https://apisandbox-api.zuora.com/rest/v1/accounts";

	client.post(url, args, function(data, response) {
		console.log(data);
	});

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

module.exports = {
	get: get,
	create: create,
};
