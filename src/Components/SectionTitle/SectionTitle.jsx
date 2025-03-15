import React from 'react';

const SectionTitle = ({heading, subheading}) => {
    return (
        <div className='w-9/12 md:w-4/12 mx-auto text-center mb-6'>
            <p className='text-yellow-600'>...{subheading}...</p>
            <h3 className='uppercase md:text-3xl text-xl border-y-4 py-2 my-4'>{heading}</h3>
            
        </div>
    );
};

export default SectionTitle;