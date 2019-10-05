const importTemplates = require ('./templates.js');
const algosdk = require('algosdk');

//connecting to algorand blockchain using provided algorand testnode credentials
const atoken = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const aserver = "http://hackathon.algodev.network";
const aport = 9100;

const algodclient = new algosdk.Algod(atoken, aserver, aport);

//recover accounts using mnemonics
var masterMnemonic = "term venture venue defense bone clap eternal tuition dance kangaroo expand dynamic waste safe hundred daughter evidence consider critic disorder priority certain enemy absent tennis"
var masterAccount = algosdk.mnemonicToSecretKey(masterMnemonic);
var templates = [importTemplates.template1, importTemplates.template2, importTtemplates.template3];

async function fundAccounts() {

    const accounts = [];
    const accLimit = 3;

    //generate accounts - each account is a unique item 
    for (i = 0; i < accLimit; i++) {
        var account = algosdk.generateAccount();
        accounts.push(account);
    }
    console.log( masterAccount.addr );
    var isValid = algosdk.isValidAddress(masterAccount.addr);
    console.log("Is this a valid address: " + isValid);

    //fund accounts from master account
    (async () => {
        //Get the relevant params from the algod
        let params = await algodclient.getTransactionParams();
        let endRound = params.lastRound + parseInt(1000);

        for (i=0; i<accLimit; i++){

            let txn = {
                "from": masterAccount.addr,
                "to": accounts[i].addr,
                "fee": 1000,
                "amount": 1200000, //each unique item get 1.2 algos
                "firstRound": params.lastRound,
                "lastRound": endRound,
                "genesisID": params.genesisID,
                "genesisHash": params.genesishashb64,
                "note": algosdk.encodeObj(0),
            };
            //sign the transaction
            let signedTxn = algosdk.signTransaction(txn, masterAccount.sk);
            //submit the transaction
            let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
            console.log("Transaction : " + tx.txId);
        }
    })().catch(e => {
    console.log(e);
    });

    //let each account create 3 transactions simulating the movement
    //of a item over a period of time

    for (i=0; i < 1;i++) {
        setInterval(createTxs(i, masterAccount.addr, accounts[0], accounts[1], accounts[2]), 12000); //update unique item every 12 seconds
    }
}

async function createTxs(shipmentStage, masteraddr, account1, account2, account3) {
    (async () => {
        //Get the relevant params from the algod
        const accounts = [account1, account2, account3];
        let params = await algodclient.getTransactionParams();
        let endRound = params.lastRound + parseInt(1000);

        for (i=0; i<accLimit; i++){

            if (shipmentStage == 0) {

                templates[0][weight] =  Math.random() * 10;
                templates[0][lastLocation] = "Adidas factory, Munich, Germany"
                
                templates[1][temp] = (Math.random() * 46) + 45;
                templates[1][weight] = (Math.random() * 150) + 50;
                templates[1][quantity] = (Math.random() * 100) + 30;
                templates[1][dollarAmount] = (Math.random() * 500) + 200;
                templates[1][lastLocation] = "Pfizer Plant, NY, United States";
                templates[1][specialInst] = "MUST KEEP BETWEEN 45 - 46 DEGREES F";

                templates[2][weight] = (Math.random() * 300) + 100;
                templates[2][quantity] = (Math.random() * 50) + 10;
                templates[2][dollarAmount] = (Math.random() * 3000) + 400;
                templates[2][lastLocation] = "Comcast manufacturer, CA, United States";
                templates[2][specialInst] = "HANDLE WITH CARE";
            }        
            if (shipmentStage == 1) {

                templates[0][lastLocation] = "DHL plant, NJ, United States"
                
                templates[1][temp] = (Math.random() * 46) + 45;
                templates[1][lastLocation] = "FedEx plant, Connecticut, United States";
                templates[1][specialInst] = "MUST KEEP BETWEEN 45 - 46 DEGREES F";

                templates[2][lastLocation] = "UPS Plant, Colorado, United States";
                templates[2][specialInst] = "HANDLE WITH CARE";
            }        
            if (shipmentStage == 3) {

                templates[0][lastLocation] = "Out for delivery, NJ, United States"
                
                templates[1][temp] = (Math.random() * 46) + 45;
                templates[1][lastLocation] = "Delivered";
                templates[1][specialInst] = "MUST KEEP BETWEEN 45 - 46 DEGREES F";

                templates[2][lastLocation] = "Delievered";
                templates[2][specialInst] = "HANDLE WITH CARE";
            }                

            let txn = {
                "from": accounts[i].addr,
                "to": masteraddr,
                "fee": 1000,
                "amount": 300000, //each account get 1.2 algos
                "firstRound": params.lastRound,
                "lastRound": endRound,
                "genesisID": params.genesisID,
                "genesisHash": params.genesishashb64,
                "note": algosdk.encodeObj(templates[i]),
            };
            //sign the transaction
            let signedTxn = algosdk.signTransaction(txn, masterAccount.sk);
            //submit the transaction
            let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
        }

    })().catch(e => {
    console.log(e);
    });
}

//process 3 items every 60 seconds
fundAccounts(); //initial call
setInterval(fundAccounts, 60000);