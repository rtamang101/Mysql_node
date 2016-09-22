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
queryFunction();

function queryFunction(){
	connection.query('select * from products', function(err, results){
		console.log('***********************Welcome to Bamazon***********************');
		for(i=0; i<results.length; i++){
			console.log('      '+results[i].ItemID+'      |      '+results[i].ProductName+'      |      $'+results[i].Price);
		}
		console.log('**************************************************************** ');
		consumerQuestions();
		function consumerQuestions(){
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

					// console.log(order.ItemID +"  "+ order.quantity);
					connection.query('select * from products where ItemID ='+order.ItemID, function(err, results, fields){

						var item = results[0];
						var total = item.Price * order.quantity;
						function totalIt(){
							console.log('total');
							// console.log('price::', typeof results[i].Price);
							console.log('available stock:: ', item.StockQuantity);
							var availableTotal = item.Price * item.StockQuantity;
							console.log('Your total for '+item.ProductName+' is $'+availableTotal);
							console.log('Thank you for shopping at Bamazon');
						};
								// if (results[i].StockQuantity <1 && results[i].StockQuantity<order.quantity){
						if(item.StockQuantity <1){
							console.log('=====================================================');
							console.log('The item you are requesting is currently out of stock');
							console.log('  We are working on to re-stock as soon as possible');
							console.log('        We apologize for the inconvenience');
							console.log('=====================================================');
							inquirer.prompt([
								{
									type: 'list',
									message: 'Would you still like to continue?',
									choices: ['Shop for other Items.', 'Done shopping'],
									name: 'outOfInventoryList'
								}	
							]).then(function(outList){
								if(outList.outOfInventoryList == 'Shop for other Items.'){
										console.log('queryFunction type::', typeof queryFunction);
										queryFunction();
								}else if(outList.outOfInventoryList == 'Done shopping'){
										connection.end();
								};
							});
									

						}else if(item.StockQuantity<order.quantity){
							console.log('==================================================');
							console.log('   There is only '+item.StockQuantity+' of the item you requested');
							console.log('We are working on to re-stock as soon as possible');
							console.log('       We apologize for the inconvenience');
							console.log('==================================================');
							inquirer.prompt([
									{
										type: 'list',
										choices: ['Buy the available stock', 'Shop for other Items', 'Done shopping'],
										message: 'Would you still like to continue',
										name: 'lessStockList'
									}
								]).then(function(lessList){
									// console.log(lessList);
									if(lessList.lessStockList == 'Buy the available stock'){
										totalIt();
									}else if(lessList.lessStockList == 'Shop for other Items'){
										queryFunction();
									}else if(lessList.lessStockList == 'Done shopping'){
										connection.end();
									};
								});
						}else{
							console.log('Your total for '+item.ProductName+' is $'+total);
							console.log('Thank you for shopping at Bamazon');
						};
				});
			});
		};
	});
};