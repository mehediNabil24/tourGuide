import React from 'react';

const NewSectionTitle = ({ heading, subheading }) => {
    return (
        <div className=' md:w-4/12 mx-auto text-center mb-6'>
            <p className='text-[#36C7D0] italic text-xl font-semibold'>{subheading}</p>
            <h3 className='text-2xl md:text-3xl text-[#205781] font-bold text-black'>{heading}</h3>
        </div>
    );
};

export default NewSectionTitle;
