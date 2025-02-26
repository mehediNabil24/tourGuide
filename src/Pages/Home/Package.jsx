// import React, { useEffect, useState } from 'react';

import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import usePackage from "../../Hooks/usePackage";
import PackageItem from "../Package/PackageItem";



const Package = () => {
    const [packages] = usePackage();

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
              <SectionTitle heading='From Our Packages' subheading={'Explore Packages'}></SectionTitle>
              <div className='grid md:grid-cols-2 gap-10'>
              {
                      packages?.slice(0,4).map(item=><PackageItem key={item._id} item={item}></PackageItem>)
                     
              }
              </div>
             <div className='flex items-center justify-center'>
             <button className="mt-4  btn btn-outline border-0 border-b-4">View All Package</button>
              
             </div>
          </div>
      );
  };
  
  export default Package;