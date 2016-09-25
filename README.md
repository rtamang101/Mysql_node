# Mysql_node

Working Bamazon app!

List of items for sale! 

Case 1: items for sale available to purchase!
	
	> lists items

	>asks for an item ID you want to buy!

	> quantity of the product

	> gives out total price of the product & updates Mysql database

	>app ends

Case 2: Items for sale out of stock!
	
	> lists items

	>asks for an item ID you want to buy!

	> quantity of the product

	> prompts the item is not available if quantity is < 1

	>prompts if would like to continue

	^if YES re-query and list item, if NO prompts thank you for shopping at bamazon

	>app ends

Case 3: Item avalable for sale but not in the quantity customers want

	> lists items

	>asks for an item ID you want to buy!

	> quantity of the product

	> prompts the item is available but less than what customer wanted

	>prompts 3 option

		>buy available stock >> prompts total >> updates Mysql database >> app ends

		>shop other items >> re-query and list sale items

		>done with shopping >> app ends



 
