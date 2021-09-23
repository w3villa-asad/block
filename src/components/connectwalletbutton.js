import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {ABI, ContractAddress} from "./smartcontract";


const WalletConnectButton = () => {

    const [add, setAdd] = useState()
    const [balance, setBalance] = useState()
    const [contna, setContna] = useState()
    const [contsup, setContsup] = useState()
    const [contsym, setContsym] = useState()
    const [contdecimal, setDecimal] = useState()
    const [userbal, setUserbal] = useState()
    // let CONTRACT=null;
    // let web3=null;

    const [CONTRACT, setCONTRACT] = useState(null)
    const [web3, setWeb3] = useState(null)

    const [owner, setOwner] = useState(null)

    const ethereum = window.ethereum;
    const [addr] = useState('')
    const [title, setTitle] = useState('')
    const [num, setNum] = useState()

    useEffect(() => {   
         if(web3 ){
             setCONTRACT(new web3.eth.Contract(ABI, ContractAddress))
             console.log("hi")
         }
     }, [web3]);


     const transfer = ()=>{
        CONTRACT.methods.transfer(title,num).send({ from: owner }).then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            console.log(error)
        })
        console.log("title",title)
        console.log("number",num)

     }
        


    const onConnect = () => {

        if (ethereum) {

            const web3instance = new Web3(window.ethereum);
            
            setWeb3(web3instance)
            console.log(web3.eth)
           
            try {
                window.ethereum.enable().then(function (accounts) {
                    // User has allowed account access to DApp...
                    setOwner(accounts[0])
                    web3.eth.getBalance(accounts[0])
                    .then((balance)=> { 
                        console.log("bal : ", balance)
                        setBalance(balance)

                        const a = balance/10**18
                        setUserbal(a)

                     });
                    console.log("acc : ", accounts[0])
                    setAdd(accounts[0])
                    // const CONTRACT = new web3.eth.Contract(ABI, ContractAddress)
                    if(CONTRACT){

                    
                    CONTRACT.methods.name().call().then((res)=>{
                     console.log("name:", res)
                     setContna(res)
                
                        
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                    CONTRACT.methods.totalSupply().call().then((res)=>{
                        res = res/10**18
                        // console.log("total supply:",res)
                        console.log(res)
                        setContsup(res)
                            
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                        CONTRACT.methods.symbol().call().then((res)=>{
                            // console.log("symbol:",res)
                            console.log(res) 
                            setContsym(res)  
                            })
                            .catch((error)=>{
                                console.log(error)
                            })
                         CONTRACT.methods.decimals().call().then((res)=>{
                            //  console.log("decimal:",res)
                            console.log(res)
                            setDecimal(res)
                             
                         })   
                         .catch((error)=>{
                            console.log(error)
                        })
                        
                        }
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
        <h2>UserBal : {userbal}ETH</h2>
        <h2>Contract Name : {contna}</h2>
        <h2>Contract Total Supply : {contsup}</h2>
        <h2>Contract Symbol : {contsym}</h2>
        <h2>Contract Decimal : {contdecimal}</h2>
        <label>Address: <input onChange={event => setTitle(event.target.value)} /></label>
        <label>Amount: <input onChange={event => setNum(event.target.value)} /></label>
        <button onClick={transfer}>Transfer</button>
        </>
    )
}
export default WalletConnectButton;