import { template1, template2, template3 } from './templates';
const algosdk = require('algosdk');


//connecting to algorand blockchain using provided algorand testnode credentials
const atoken = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const aserver = "http://hackathon.algodev.network";
const aport = 9100;

const algodclient = new algosdk.Algod(atoken, aserver, aport);

//recover accounts using mnemonics
var masterMnemonic = "term venture venue defense bone clap eternal tuition dance kangaroo expand dynamic waste safe hundred daughter evidence consider critic disorder priority certain enemy absent tennis"
var masterAccount = algosdk.mnemonicToSecretKey(masterMnemonic);

async function createTxs() {

    const accounts = [];

    //generate account 
    for (i = 0; i < 3; i++) {
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

        for (i=0; i<3; i++){

            let txn = {
                "from": masterAccount.addr,
                "to": accounts[i].addr,
                "fee": 1000,
                "amount": 1200000, //each account get 1.2 algos
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
    //of a shipment over a period of time



}

//process 3 items every 60 seconds
createTxs(); //initial call
setInterval(createTxs, 60000);