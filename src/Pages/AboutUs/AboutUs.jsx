import React from 'react';

import developerImage from '../../assets/others/devimg.png'

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About the Developer</h1>
        <div className="flex flex-col md:flex-row items-center justify-center bg-white p-8 rounded-lg shadow-lg">
          <img
            src={developerImage}
            alt="Developer Photo"
            className="w-40 h-40  border-4 border-gray-400 mb-6 md:mb-0 md:mr-8"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">Mehedi Hasan Nabil</h2>
            <p className="text-lg text-gray-600 mt-4 mb-6 text-left">
              Mehedi Hasan is a passionate full-stack developer with a focus on building scalable and robust applications. 
              He specializes in JavaScript, React, Node.js, MongoDB, and more. He loves learning new technologies and 
              sharing knowledge with others.
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Number of Projects Created: 10+
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Links to Projects:
            </p>
            <ul className="list-none">
              <li className="mb-2">
                <a
                  href="https://fardin-newspaper.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Project 1
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://project-link2.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Project 2
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://project-link3.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Project 3
                </a>
              </li>
              {/* Add more projects here */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
