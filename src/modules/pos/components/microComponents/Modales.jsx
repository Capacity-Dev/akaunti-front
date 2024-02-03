import React from 'react';

const Modales = ({modal}) => {
    return (
        <section className='Modal h-100 w-100 flex-center'>
            {modal}
        </section>
    );
};

export default Modales;