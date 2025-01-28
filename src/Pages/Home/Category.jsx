import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import slide1 from '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import slide5 from '../../assets/home/slide5.jpg'
import SectionTitle from '../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle heading={'order online'} subheading={'From 11.00am to 10.00pm'} ></SectionTitle>
            <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-28"
      >
        <SwiperSlide>
            <img src={slide1} alt="" />
            <p className='text-4xl uppercase text-white text-center -mt-24'>Salad</p>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide2} alt="" />
            <p className='text-4xl uppercase text-white text-center -mt-24'>Pizza</p>
        </SwiperSlide><SwiperSlide>
            <img src={slide3} alt="" />
            <p className='text-4xl uppercase text-white text-center -mt-24'>Desert</p>
        </SwiperSlide><SwiperSlide>
            <img src={slide4} alt="" />
            <p className='text-4xl uppercase text-white text-center -mt-24'>cake</p>
        </SwiperSlide><SwiperSlide>
            <img src={slide5} alt="" />
            <p className='text-4xl uppercase text-white text-center -mt-24'>Salad</p>
        </SwiperSlide>
      </Swiper>
        </section>
    );
};

export default Category;