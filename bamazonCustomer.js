var mysql      = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  port: '3307'
});

connection.connect(function(err){
if (err)throw err;
// console.log('the connection id is'+ connection.threadId);
}) ;

connection.query('select * from products', function(err, results){
	console.log('***********************Welcome to Bamazon***********************');
	for(i=0; i<results.length; i++){
		console.log('      '+results[i].ItemID+'      |      '+results[i].ProductName+'      |      $'+results[i].Price);
	}
	console.log('****************************************************************');
});
inquirer.prompt([
	{
		type: 'input',
		message: 'Please enter the ItemID you want to purchase:',
		name: 'itemID'
	},
	{
		type: 'input',
		message: 'Please enter the quantity:',
		name: 'quantity'
	}
	]).then(function(order){
		console.log(results[i].ItemID);
	});

// inquirer.prompt([
// 	{
// 		type: 'list',
// 		choices: ['list available items', 'Buy a product'],
// 		name: 'list',
// 		message: 'Welcome to Bamazon, what would you like to do?'
// 	}
// 	]).then(function(results){
// 		console.log(results);
// 		if(results.list == 'list available items'){
// 			connection.query('SELECT * FROM bamazon.products', function(err, results){
// 				console.log(results);
// 			});
// 		}
// 		// else{
// 		// 	connection.query('')
// 		// }
// 	});
