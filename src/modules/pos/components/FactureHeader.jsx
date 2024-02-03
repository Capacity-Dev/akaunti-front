import React from 'react';

const FactureHeader = ({showFactureCard,hiddenCardFact}) => {
    return (
        <div className="factureHeader d-flex">
            <div className='flex-center h-100 p-10 w-100'>
                <div className='h-100'>
                    <img className='h-100' src="img/logo.png" alt="" />
                </div>
                <div className='w-100 nameLogicielCard'>
                    <h1><span>A</span>kaunti</h1>
                    <p>Gerez votre caise avec akaunti</p>
                </div>
            </div>
            <div onClick={()=>{hiddenCardFact()}} className={'closeBtn '+showFactureCard} >
                x
            </div>
        </div> 
    );
};

export default FactureHeader;