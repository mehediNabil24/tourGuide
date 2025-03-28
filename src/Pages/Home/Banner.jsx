import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

import img1 from "../../assets/home/dino-reichmuth-A5rCN8626Ck-unsplash(1).jpg";
import image2 from "../../../src/assets/home/felix-rostig-UmV2wr-Vbq8-unsplash.jpg";

import image4 from "../../assets/home/mesut-kaya-eOcyhe5-9sQ-unsplash.jpg";
import { Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

// const textArray = [
//   "Let's Go Now",
//   "Explore and Travel",
//   "Discover New Places",
//   "Adventure Awaits",
//   "Find Your Journey",
//   "See the World",
// ];



const Banner = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: img1,
      title: "Experience Unmatched Elegance",
      description: "Where every detail is crafted for your ultimate indulgence.",
    },
    {
      image: image2,
      title: "Redefining Modern Sophistication",
      description: "Effortless luxury tailored to your unique desires.",
    },
    {
      image: image4,
      title: "Luxury Without Compromise",
      description: "Discover a world where excellence meets exclusivity.",
    },
  ];
  return (
    <Carousel
  showThumbs={false}
  autoPlay={true}
  infiniteLoop={true}
  interval={5000}
  showStatus={false}
  showArrows={true}
  stopOnHover={false}  // Prevent autoplay from stopping on hover
  className="w-full md:mb-12 mb-10 bg-gray-100"
>
  {slides.map((slide, index) => (
    <div key={index} className="relative w-full h-[250px] md:h-[550px] sm:h-[250px] overflow-hidden">
      {/* Continuous Zoom-In Effect from Center */}
      <motion.img
        src={slide.image}
        className="w-full h-full object-cover"
        alt={`slide-${index}`}
        animate={{
          scale: [1, 1.3], // Zoom in effect
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Text Pop-Up Effect from Center */}
      {/* <motion.div
        className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold bg-black/30"
        initial={{ opacity: 0, y: 50 }} // Start from below the container (y = 50)
        animate={{ opacity: 1, y: 0 }}  // Move to the center of the container (y = 0)
        transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
      >
        {textArray[index]}
      </motion.div> */}

      <div
              className="absolute inset-0 md:px-14 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center  px-4"
            >
              <Slide
                damping={0.2}
                cascade
                direction="up"
                className="container mx-auto"
                >
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-1 md:mb-4 ">
                  {slide.title}
                </h2>
                <p className="text-lg lg:text-xl text-white mb-4 md:mb-6">
                  {slide.description}
                </p>
                <div className="flex justify-center ">
                <button
                  onClick={() => navigate("/package")}
                  className="btn bg-blue-500 border-none text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  Book Now <AiOutlineArrowRight className="text-lg" />
                </button>
                </div>
              </Slide>
            </div>



    </div>
  ))}
</Carousel>

  );
};

export default Banner;
