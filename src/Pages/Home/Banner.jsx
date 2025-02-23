import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from "../../assets/home/slide-3.jpg"
import image2 from '../../../src/assets/home/slide-2.jpg'
import image3 from '../../../src/assets/home/slide-1.jpg'

import image4 from '../../assets/home/slide-4.jpg'
import image5 from '../../assets/home/slide-5.jpg'
import image6 from '../../assets/home/slide-6.jpg'
const Banner = () => {
    return (
        <Carousel>
        <div className="w-full h-[600px] object-cover">
            <img src={img1}  />
            
        </div>
        <div className="w-full h-[600px] object-cover">
            <img src={image2}   />
            
        </div>
        <div className="w-full h-[600px] object-cover">
            <img src={image3}   />
            
        </div>
        <div className="w-full h-[600px] object-cover">
            <img src={image4}   />
            
        </div>
        <div className="w-full h-[600px] object-cover">
            <img src={image5}   />
            
        </div>
        <div className="w-full h-[600px] object-cover">
            <img src={image6}  />
            
        </div>
    </Carousel>
    );
};

export default Banner;