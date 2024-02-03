import React from 'react';

const ActionModales = ({closeModal,message,actionMsg,action}) => {
    return (
        <div className='ConfirmAction flex-center flex-column ' >
            {message}
            <button onClick={()=>{closeModal()}} className='CloseConfirmAction' >X</button>
            <div className='d-flex justify-content-end w-100 actionsModalNaire '>
                <button onClick={()=>{closeModal()}}>Annuller</button>
                <button onClick={()=>{closeModal();
                    if(typeof action == 'function')action()}}>{actionMsg}</button>
            </div>
        </div>
    );
};

export default ActionModales;