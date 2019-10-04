const algosdk = require('algosdk');

//connecting to algorand blockchain using provided algorand testnode credentials
const atoken = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const aserver = "http://hackathon.algodev.network";
const aport = 9100;

const algodclient = new algosdk.Algod(atoken, aserver, aport);

//generate account 
//var account = algosdk.generateAccount();
//console.log( account.addr );

//get backup phrase for account
//var mnemonic = algosdk.secretKeyToMnemonic(account.sk);
//console.log( mnemonic );

mnemonics = {
  0 : "load crowd uncle cluster roof dial twin busy moon pulse harsh size chalk frog next office follow hundred medal air dentist settle town about give",
  1: "term venture venue defense bone clap eternal tuition dance kangaroo expand dynamic waste safe hundred daughter evidence consider critic disorder priority certain enemy absent tennis",
  2: "aisle rally more spike marble chapter cake vocal vicious planet dash point scale spring custom drink vocal mouse oyster rhythm hobby wise bitter abandon spoil",
  3 : "depth employ edit interest basic unfair blue flee equal tonight theme cushion forget mouse renew reform vicious double stadium boss casino circle manage about curtain"
}

//recover accounts using mnemonics
var account = algosdk.mnemonicToSecretKey(mnemonics[1]);
console.log(account.addr)

/*
//send transaction to algorand blockchain
(async () => {
      //Get the relevant params from the algod
      let params = await algodclient.getTransactionParams();
      let endRound = params.lastRound + parseInt(1000);

      const template1 = {
        itemId: 44,
        temp: 57.5,
        weight: 789,
        itemName: "sandles"
      };

      let txn = {
          "from": account.addr,
          "to": "S3L2IYSYHQYANNKY53HEXHRGV5KBLFPIAXLBK36S7XJY4UISFYFM7K3E3I",
          "fee": 1000,
          "amount": 1000,
          "firstRound": params.lastRound,
          "lastRound": endRound,
          "genesisID": params.genesisID,
          "genesisHash": params.genesishashb64,
          "note": algosdk.encodeObj(template1),
      };
      //sign the transaction
      let signedTxn = algosdk.signTransaction(txn, account.sk);
      //submit the transaction
      let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
      console.log("Transaction : " + tx.txId);
      decodeNotes(tx.txId);
})().catch(e => {
  console.log(e);
});


//function to read notes field from a transaction using txID
(async function decodeNotes(txid){
    let params = await algodclient.getTransactionParams();
    let txidCurrent = txid;

    let tx = (await algodclient.transactionInformation( account.addr, txidCurrent ));
    let encodednote =   JSON.stringify(algosdk.decodeObj(tx.note), undefined, 4);
    console.log( "Decoded: " + encodednote );
 
})().catch(e => {
    console.log(e.error);
});
*/