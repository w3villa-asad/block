import React, { useState } from "react";
import Web3 from "web3";
import {ABI, ContractAddress} from "./smartcontract";


const WalletConnectButton = () => {

    const [add, setAdd] = useState()
    const [balance, setBalance] = useState()
    const [contna, setContna] = useState()
    const [contsup, setContsup] = useState()
    const [contsym, setContsym] = useState()
    const [contdecimal, setDecimal] = useState()

    let web3;
    const ethereum = window.ethereum;
    const [addr] = useState('')

    const onConnect = () => {

        if (ethereum) {
            web3 = new Web3(window.ethereum);

            console.log(web3.eth)
           
            try {
                window.ethereum.enable().then(function (accounts) {
                    // User has allowed account access to DApp...
                    
                    web3.eth.getBalance(accounts[0])
                    .then((balance)=> { 
                        console.log("bal : ", balance)
                        setBalance(balance)
                     });
                    console.log("acc : ", accounts[0])
                    setAdd(accounts[0])
                    const CONTRACT = new web3.eth.Contract(ABI, ContractAddress)
                    CONTRACT.methods.name().call().then((res)=>{
                     console.log("name:", res)
                     setContna(res)
                
                        
                    })
                    CONTRACT.methods.totalSupply().call().then((res)=>{
                        res = res/10**18
                        // console.log("total supply:",res)
                        console.log(res)
                        setContsup(res)
                            
                        })
                        CONTRACT.methods.symbol().call().then((res)=>{
                            // console.log("symbol:",res)
                            console.log(res) 
                            setContsym(res)  
                            })

                         CONTRACT.methods.decimals().call().then((res)=>{
                            //  console.log("decimal:",res)
                            console.log(res)
                            setDecimal(res)
                             
                         })   
                    // window.contract = myContract

                    //balanceof(address)
                });
            } catch (e) {
                // User has denied account access to DApp...
            }
        }
        // Legacy DApp Browsers
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        }
        // Non-DApp Browsers
        else {
            alert('You have to install MetaMask !');
        }


    }


    return (
        <>
        <button onClick={onConnect}>Connect</button>
        <h2>Address : {add}</h2>
        <h2>Balance : {balance}</h2>
        <h2>Contract Name : {contna}</h2>
        <h2>Contract Total Supply : {contsup}</h2>
        <h2>Contract Symbol : {contsym}</h2>
        <h2>Contract Decimal : {contdecimal}</h2>
        </>
    )
}
export default WalletConnectButton;