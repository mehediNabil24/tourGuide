import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import Cover from '../Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items,title,img}) => {
    return (
        <div className='my-20'>
              {title && <Cover img={img} title={title}></Cover>}
             <div className='grid md:grid-cols-2 gap-10 mt-12 px-14'>
            {
                    items?.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
                   
            }
            </div>
            <div className='flex justify-center mt-4'>
            <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4">Order Food</button></Link>
            </div>
            
        </div>
    );
};

export default MenuCategory;