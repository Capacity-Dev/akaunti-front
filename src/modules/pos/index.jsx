import React, { useEffect, useRef, useState } from 'react';
import CardFacture from './components/CardFacture';
import CardPrincipal from './components/CardPrincipal';
import './styles/index.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductModel from '../../models/products';

const Home = () => {
    const billComponent= useRef(null);
    const [showFactureCard,setshowFactureCard] = useState("");
    const [bill, setBill] = useState([]);
    const [config,setConfig] = useState({
        "companyName": "",
        "goodbye": "A bientôt ! ",
        "adress": "",
        "phone": "",
        "taux": "",
        "tva": "",
        "companyLogo": ""
    })
    useEffect(()=>{
        ProductModel.getConfigs().then(data=>{
            console.log(data,"yes")
            setConfig(data)
        }).catch(error=>{
            console.log(error,"no")
            let msg =
            error.response && error.response.data
              ? error.response.data.error
              : error.message;
          toast.error(`Impossible de charger les informations (${msg})`, {
            autoClose: 5000,
          });
        })
    },[])
    function showFactureCardFunc() {
        if (showFactureCard.length > 3) {
            setshowFactureCard('')
        }else{
            setshowFactureCard('changeDisplay')
            setTimeout(()=>{setshowFactureCard('changeDisplay showSectionCard')})
        }
    }
    function hiddenCardFact() {
        setshowFactureCard('changeDisplay')
        setTimeout(()=>{setshowFactureCard('')},300) 
    }
    
    return (
        <>
        <ToastContainer autoClose={8000} />
        <div id={"pos-container"} className='content d-flex h-100' >
            <CardFacture billComponent={billComponent} bill={bill} config={config} showFactureCard={showFactureCard} hiddenCardFact={hiddenCardFact} />
            <CardPrincipal billComponent={billComponent} config={config} showBill={showFactureCardFunc} bill={bill} setBill={setBill} />
        </div> 
        </>
    );
};

export default Home;