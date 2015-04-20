var request = require('request');
var Client = require('node-rest-client').Client;

// Test authentication
// TODO retrieve authentication from configuration
var authArgs = {user: "munk801@gmail.com", password: "$altLak3"};
client = new Client(authArgs);
var accountsUrl = "https://apisandbox-api.zuora.com/rest/v1/accounts";
var subscrptionsUrl = "https://apisandbox-api.zuora.com/rest/v1/subscriptions/accounts";

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
	var args = {
		data: testAccount,
		headers: {"Content-Type" : "application/json"}
	};
	client.post(accountsUrl, args, function(data, response) {
		console.log(data);
	});

};

var get = function() {
	var args = {};
	var accountUrl = accountsUrl + "/A00000001";
	client.get(accountUrl, args, function(data, response) {
		console.log(data);
		// console.log(response);
	});
};

var getProduct = function() {
	/*
	Retrieve product with this schema
	[{
		productId: 
		ratePlanId:
		billingDay:
		subscriptionStartDate:
		status:
		subscriptionId:
	},...]
	*/
	var args = {};
	var subscriptionUrl = subscrptionsUrl + "/A00000001";
	var products = [];
	client.get(subscriptionUrl, args, function(data, response) {
		var products = [];
		for (i = 0; i < data.subscriptions.length; i++) {
			var subscription = data.subscriptions[i];
			for (j = 0; j < subscription.ratePlans.length; j++) {
				var ratePlan = subscription.ratePlans[j];
				var product = {
					productId : ratePlan.productId,
					ratePlanId : ratePlan.id,
					billingDay : ratePlan.ratePlanCharges.billingDay,
					subscriptionStartDate : subscription.subscriptionStartDate,
					status : subscription.status,
					subscriptionId: subscription.id,
				}
				products.push(product);
			}
		}
		console.log(products);
	});

};

module.exports = {
	get: get,
	create: create,
	getProduct: getProduct,
};
