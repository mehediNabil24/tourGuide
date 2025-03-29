import React from 'react';
import { Parallax } from 'react-parallax';

const PackageHero = () => {
    return (
        <div>
             <Parallax
                  blur={{ min: -5, max: 7 }}
                  strength={200}
                  bgImage="../../../src/assets/home/rajvinder-singh-S9rlt7gI9HM-unsplash (1).jpg"
                  className="relative"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
                  <div className="flex flex-col justify-center items-center text-center text-white px-4 py-20 relative">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Package Details</h1>
                    <p className="text-lg md:text-xl w-[80%] md:w-[60%] mb-6">
                      Home / Package Details
                    </p>
            
                   
                  </div>
                </Parallax>
            
        </div>
    );
};

export default PackageHero;