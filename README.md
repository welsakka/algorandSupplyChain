# Algorand Material Supply Chain App

This app demonstrates the use of the Algorand blockchain as a ledger for items/shipments 
processed on a supply chain. 

Every item is given their own account, to allow ease of searchability, and to create uniqueness. A master account funds each unique item. The app simulates three checkpoints for an item to process through: Manufacturer, 3PL site, and Consumer. An item creates a transaction everytime it reaches a new checkpoint. The transaction takes advantage of the notes field to include important info pertaining to the item. It does this using templates: an object which includes different data fields like temperature, weight, quantity, etc. Additionally, a simple dashboard allows users to query their item by searching for their item's address. 

### Download dependancies using:

npm install

### Then cd into my-app and run:

npm start

The app uses 
- Create-React-App as a foundation for the frontend.
- Algosdk for Nodejs is used to interact with the algorand blockchain. 
- Material UI for the dashboard.

Modern Supply chain systems are often siloed from each other, which allows poor communication and efficiency to fester. The Algorand blockchain can allow businesses and consumers to track items through every step of the process. Additionally, information on an item currently in the supply chain can be shared on the blockchain, to ensure an item's condition is as expected. Making use of a blockchain can make auditing and record keeping simple, inexpensive, and secure.

Thanks to Algorand for hosting the Gitcoin bounty, and to the developers at Algorand!
