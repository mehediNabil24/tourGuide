import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import img1 from "../../assets/home/slide-3.jpg";
import image2 from "../../../src/assets/home/slide-2.jpg";
import image3 from "../../../src/assets/home/slide-1.jpg";
import image4 from "../../assets/home/slide-4.jpg";
import image5 from "../../assets/home/slide-5.jpg";
import image6 from "../../assets/home/slide-6.jpg";

const Banner = () => {
  return (
    <Carousel 
      showThumbs={false} 
      autoPlay 
      infiniteLoop 
      dynamicHeight={false}
      className="w-full md:mb-20 mb-14 bg-gray-100"
    >
      {[img1, image2, image3, image4, image5, image6].map((image, index) => (
        <div key={index} className="w-full h-[250px] md:h-[550px] sm:h-[250px]">
          <img src={image} className="w-full h-[300px] md:h-[550px] sm:h-[300px] object-cover" alt={`slide-${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
