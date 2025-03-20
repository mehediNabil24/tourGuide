import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaLink,
  FaCss3Alt,
  FaDatabase,
  FaHtml5,
  FaBootstrap,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si"; // Tailwind CSS icon

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      name: "Ghure Ashi",
      image: "https://i.postimg.cc/t4HSCtRT/feature-1.png", // Larger placeholder
      liveLink: "https://tourism-client-site-5591a.web.app/",
      githubLink: "https://github.com/mehediNabil24/tourGuide--Ghure-Ashi",
      description:
        "Ghure Ashi is a comprehensive Tourism Management System designed to help travelers explore Bangladesh with ease. It provides detailed insights into popular destinations, curated travel packages, and professional tour guides.",
      features: [
        "3 Role: Users, TourGuide, Admin",
        "User can booking the package",
        "TourGuide manage his bookings",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    },
    {
      id: 2,
      name: "Historical Artifacts Tracker",
      image: "https://i.postimg.cc/MTYYrR95/feature-2.png", // Larger placeholder
      liveLink: "https://fardin-newspaper.web.app/",
      githubLink: "https://github.com/mehediNabil24/Artifacts",
      description:
        "The Historical Artifacts Tracker is a powerful tool for cataloging, managing, and analyzing historical artifacts.Users can seamlessly explore artifact details, track historical records, and manage collections with ease. 🚀📜.",
      features: ["Users can give like on artifacts.", "can add, update, and delete artifacts", "Artifacts Search By their name"],
      technologies: ["React", "Tailwind CSS", "MongoDB"],
    },
    {
      id: 3,
      name: "Project 3",
      image: "https://i.postimg.cc/TYnt4RBF/Feature-3.png", // Larger placeholder
      liveLink: "https://example.com",
      githubLink: "https://github.com/user/project3",
      description:
        "A data visualization dashboard using D3.js. The project presents complex data in an easy-to-understand format, helping users gain insights quickly.",
      features: [
        "Interactive Graphs",
        "Data Filtering",
        "Customizable Dashboards",
      ],
      technologies: ["D3.js", "React", "Express"],
    },
  ];

  return (
    <div id="projects" className="py-12 bg-gray-100 text-black">
      <div className="text-center mb-8">
        <h2 className=" text-3xl sm:text-4xl font-extrabold text-pink-500">My Projects</h2>
        <p className="text-lg">Here are some of my best projects</p>
      </div>

      {/* Project Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-dark text-black shadow-lg rounded-lg max-w-xl w-full"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Side: Project Image (50% width) */}
              <div className="w-full md:w-1/2">
                <img
                  src={project.image}
                  alt={project.name}
                  className="rounded-t-lg md:rounded-l-lg w-full h-2/3 object-cover"
                />
              </div>

              {/* Right Side: Project Content (50% width) */}
              <div className="p-4 flex flex-col justify-between w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-pink-500">
                  {project.name}
                </h3>
                <p className="mt-4">{project.description}</p>

                <h6 className="text-lg font-semibold mt-3">Features:</h6>
                <ul className="list-disc ml-6 text-sm">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <h6 className="text-lg font-semibold mt-3">Technologies:</h6>
                <div className="flex gap-4 mt-2">
                  {project.technologies.includes("React") && (
                    <FaReact size={30} title="React" />
                  )}
                  {project.technologies.includes("Node.js") && (
                    <FaNodeJs size={30} title="Node.js" />
                  )}
                  {project.technologies.includes("MongoDB") && (
                    <FaDatabase size={30} title="MongoDB" />
                  )}
                  {project.technologies.includes("Next.js") && (
                    <FaHtml5 size={30} title="Next.js" />
                  )}
                  {project.technologies.includes("Tailwind CSS") && (
                    <SiTailwindcss size={30} title="Tailwind CSS" />
                  )}
                  {project.technologies.includes("D3.js") && (
                    <FaBootstrap size={30} title="D3.js" />
                  )}
                  {project.technologies.includes("Stripe API") && (
                    <FaCss3Alt size={30} title="Stripe API" />
                  )}
                </div>

                <div className="mt-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="text-white bg-pink-500 px-4 py-2 rounded-md hover:bg-pink-700 mr-3">
                      <FaLink className="mr-2" />
                      Live Project
                    </button>
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="text-white bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-900">
                      <FaGithub className="mr-2" />
                      GitHub Repo
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
