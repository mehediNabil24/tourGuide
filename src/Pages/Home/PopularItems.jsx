// import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import MenuItem from '../Shared/MenuItem/MenuItem';
import useMenu from '../../Hooks/useMenu';

const PopularItems = () => {
    const [menu] = useMenu();
    const popular = menu?.filter(item=> item.category === 'popular');
    // const [menu,setMenu] = useState();
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         const popularItems = data.filter(item=>item.category==='popular')
    //         setMenu(popularItems)
    //     })
    // },[])
    return (
        <div className='mb-12'>
            <SectionTitle heading='From Our Menu' subheading={'Popular Items'}></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
            {
                    popular?.map(item=><MenuItem key={item._id} item={item}></MenuItem>)
                   
            }
            </div>
           <div className='flex items-center justify-center'>
           <button className="mt-4  btn btn-outline border-0 border-b-4">View Full Menu</button>
            
           </div>
        </div>
    );
};

export default PopularItems;