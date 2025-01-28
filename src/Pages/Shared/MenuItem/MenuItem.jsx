import React from 'react';

const MenuItem = ({item}) => {
    const {name, image, price, recipe} = item;
    
    return (
        <div className='flex space-x-2  '>
            <img className="w-[100px] rounded-[0_200px_200px_200px]" src={image} alt="" />

            <div className='flex'>
            <div>
                <h3 className="uppercase">{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <div>
                <p className='text-yellow-500'>${price}</p>
            </div>
            </div>
            
        </div>
    );
};

export default MenuItem;