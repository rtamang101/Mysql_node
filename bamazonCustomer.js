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
	console.log('**************************************************************** ');
	inquirer.prompt([
		{
			type: 'input',
			message: 'Please enter the ItemID you want to purchase:',
			name: 'ItemID'
		},
		{
			type: 'input',
			message: 'Please enter the quantity:',
			name: 'quantity'
		}
		]).then(function(order){
			console.log(order.ItemID +"  "+ order.quantity);
			connection.query('select * from products where ItemID ='+order.ItemID+'', function(err, results){
					var total = results.Price * order.quantity;
					console.log(results.ItemID);

					if (results = {}){
						console.log('incorrect itemid try again');
					}else{
						console.log('Your total for '+results.ProductName+' is $'+total);
						console.log('Thank you for shopping at Bamazon');
					}
				
			})
		});
});
