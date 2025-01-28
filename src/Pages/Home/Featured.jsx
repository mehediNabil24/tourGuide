import React from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import featuredImg from '../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20 '>
            <SectionTitle subheading={'check it out'} heading={'Featured items'}></SectionTitle>
            <div className='md: flex justify-center items-center pb-20 pt-12 px-36 bg-slate-400 bg-opacity-40'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where Can I get Some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates nihil alias consectetur dolores eaque possimus molestiae, ducimus fugiat libero? Praesentium eius ipsum, nesciunt sed maiores non omnis ea dolores tempora aliquid natus sit incidunt ex voluptatum tenetur a adipisci cumque.</p>
                    <button className="btn btn-outline border-0 border-b-4">View More</button>
                </div>
            </div>
            
        </div>
    );
};

export default Featured;