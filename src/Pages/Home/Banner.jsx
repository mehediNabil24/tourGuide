import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

import img1 from "../../assets/home/manzur-alam-AMqrW1Sxx3g-unsplash.jpg";
import image2 from "../../../src/assets/home/felix-rostig-UmV2wr-Vbq8-unsplash.jpg";

import image4 from "../../assets/home/slide-4.jpg";


const textArray = [
  "Let's Go Now",
  "Explore and Travel",
  "Discover New Places",
  "Adventure Awaits",
  "Find Your Journey",
  "See the World",
];

const Banner = () => {
  return (
    <Carousel
  showThumbs={false}
  autoPlay={true}
  infiniteLoop={true}
  interval={5000}
  showStatus={false}
  showArrows={true}
  stopOnHover={false}  // Prevent autoplay from stopping on hover
  className="w-full md:mb-20 mb-14 bg-gray-100"
>
  {[img1, image2,  image4].map((image, index) => (
    <div key={index} className="relative w-full h-[250px] md:h-[550px] sm:h-[250px] overflow-hidden">
      {/* Continuous Zoom-In Effect from Center */}
      <motion.img
        src={image}
        className="w-full h-full object-cover"
        alt={`slide-${index}`}
        animate={{
          scale: [1, 1.2], // Zoom in effect
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Text Pop-Up Effect from Center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold bg-black/30"
        initial={{ opacity: 0, y: 50 }} // Start from below the container (y = 50)
        animate={{ opacity: 1, y: 0 }}  // Move to the center of the container (y = 0)
        transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
      >
        {textArray[index]}
      </motion.div>

    </div>
  ))}
</Carousel>

  );
};

export default Banner;
