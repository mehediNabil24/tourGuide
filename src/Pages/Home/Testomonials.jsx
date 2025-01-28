import React, { useEffect } from 'react';
import { useState } from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {  Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testomonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/reviews')
        .then(res=>res.json())
        .then(data=> setReviews(data))
    },[])
    return (
        <div className='my-12 mx-24'>
            <SectionTitle heading={'Testimonials'} subheading={'What our Client Say'}
            >

            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
            reviews.map(review=>  <SwiperSlide key={review._id}>
                <div className='flex flex-col items-center'>
                <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
                    <p className='my-4 mx-16'>{review.details}</p>
                    <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                </div>
            </SwiperSlide> )
        }
       
        
      </Swiper>
            
        </div>
    );
};

export default Testomonials;