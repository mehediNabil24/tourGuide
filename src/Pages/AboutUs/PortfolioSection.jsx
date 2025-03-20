import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";

const PortfolioSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-black px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 w-full max-w-6xl mx-auto">
        
        {/* Left Section (Text) */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hi, It's <span className="text-pink-500">Nabil</span>
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-xl font-semibold text-red-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            I'm a <span className="text-purple-400">Developer, Researcher, and Learner</span>
          </motion.h2>

          <p className="text-black text-sm sm:text-base mb-6 leading-relaxed">
            I specialize in building dynamic web applications with <strong>React</strong> and <strong>Express.js</strong>.
            My focus is on crafting user-friendly interfaces that are both engaging and functional.
          </p>

          {/* Download Resume Button */}
          <div className="flex justify-center md:justify-start">
            <a 
              href="/Mehedi_Hasan_Nabil_Resume.pdf" 
              download="Mehedi_Hasan_Nabil_Resume.pdf"
              className="inline-flex items-center gap-2 bg-blue-500 px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition"
            >
              Download Resume
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start space-x-6 mt-6 text-2xl sm:text-3xl">
            <motion.a 
              href="https://www.linkedin.com/in/mehedi-hasan-nabil--/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-transform transform hover:scale-110"
              whileTap={{ scale: 1.2 }}
            >
              <FaLinkedin />
            </motion.a>

            <motion.a 
              href="https://github.com/mehediNabil24" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-transform transform hover:scale-110"
              whileTap={{ scale: 1.2 }}
            >
              <FaGithub />
            </motion.a>

            <motion.a 
              href="mailto:mehedinabil13@gmail.com"
              className="text-red-500 hover:text-red-600 transition-transform transform hover:scale-110"
              whileTap={{ scale: 1.2 }}
            >
              <FaEnvelope />
            </motion.a>

            <motion.a 
              href="https://scholar.google.com/citations?user=RPa-B0oAAAAJ&hl=en"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 transition-transform transform hover:scale-110"
              whileTap={{ scale: 1.2 }}
            >
              <FaGoogleScholar />
            </motion.a>
          </div>
        </div>

        {/* Right Section (Profile Image) */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex-1 flex justify-center"
        >
          <img
            src="/image(4).png" // Ensure correct path
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full border-4 border-pink-400 shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioSection;
