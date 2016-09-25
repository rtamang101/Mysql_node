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
					connection.query('select * from products where ItemID ='+order.ItemID, function(err, results, fields){
						var item = results[0];
						var total = item.Price * order.quantity;
						function totalIt(){
							var availableTotal = item.Price * item.StockQuantity;
							setTimeout(function(){
								console.log('Your total for '+item.ProductName+' is $'+availableTotal);
								setTimeout(function(){console.log('Thank you for shopping at Bamazon');},2000);
								connection.query('UPDATE bamazon.products SET StockQuantity = 0 WHERE ItemID ='+item.ItemID, function(err,results,feilds){
								setTimeout(function(){connection.end();},1000);
								});
							},2000);
						};
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
									setTimeout(function(){
										queryFunction();
									},2000);
								}else if(outList.outOfInventoryList == 'Done shopping'){
										setTimeout(function(){
											console.log('Thank you for shopping with Bamazon');
										},2000);
										setTimeout(function(){connection.end();},2000);
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
								if(lessList.lessStockList == 'Buy the available stock'){
									totalIt();
								}else if(lessList.lessStockList == 'Shop for other Items'){
									setTimeout(function(){
										queryFunction();
									},2000);
								}else if(lessList.lessStockList == 'Done shopping'){
									setTimeout(function(){
										console.log('Thank you for shopping at Bamazon');
										connection.end();
									},2000);
								}
							});
						}else{
							setTimeout(function(){
								console.log('Your total for '+item.ProductName+' is $'+total);
								setTimeout(function(){console.log('Thank you for shopping at Bamazon');},2000);
								connection.query('UPDATE bamazon.products SET StockQuantity ='+(item.StockQuantity - order.quantity)+' WHERE ItemID ='+item.ItemID, function(err,results,feilds){
								connection.end();
								});
							},2000);
						}
				});
			});
		}
	});
}