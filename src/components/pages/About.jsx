// About.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaSpotify,
  FaDiscord, FaYoutube, FaExternalLinkAlt, FaCode, FaReact,
  FaNodeJs, FaFigma,
} from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiFirebase } from 'react-icons/si';
import SocialCard, { SocialCardGrid } from '../cards/SocialCard';
import PageSwitching from '../loading/PageSwitching';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

// --- HELPER FUNCTION ---
const extractIdentifier = (url) => {
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    if (hostname.includes('facebook.com') && searchParams.get('id')) {
      return searchParams.get('id');
    }
    return pathname.split('/').filter(Boolean).pop();
  } catch (e) {
    console.error('Invalid URL:', e);
    return 'default';
  }
};

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay }
    }),
  };

  const socials = [
    {
      name: 'Shashwath K',
      platform: 'facebook',
      icon: <FaFacebookF />,
      link: 'https://www.facebook.com/profile.php?id=100009465161906',
      profileImg: `https://unavatar.io/facebook/${extractIdentifier('https://www.facebook.com/profile.php?id=100009465161906')}`,
    },
    {
      name: 'Shashwath K',
      platform: 'twitter',
      icon: <FaTwitter />,
      link: 'https://x.com/shashwath_k15',
      profileImg: `https://unavatar.io/twitter/${extractIdentifier('https://x.com/shashwath_k15')}`,
    },
    {
      name: 'Shashwath K',
      platform: 'github',
      icon: <FaGithub />,
      link: 'https://github.com/shashwath-k',
      profileImg: `https://unavatar.io/github/shashwath-k`,
    },
    {
      name: 'Spotify Profile',
      platform: 'spotify',
      icon: <FaSpotify />,
      link: 'https://open.spotify.com/user/31omectxpm23tbqslxwj5b24a5qa',
      profileImg: `https://unavatar.io/spotify/31omectxpm23tbqslxwj5b24a5qa`,
    },
    {
      name: 'LinkedIn Profile',
      platform: 'linkedin',
      icon: <FaLinkedinIn />,
      link: 'https://www.linkedin.com/in/shashwath-k-b6482623a/',
      profileImg: 'https://unavatar.io/linkedin.com',
    },
    {
      name: 'Shashwath K S',
      platform: 'youtube',
      icon: <FaYoutube />,
      link: 'https://www.youtube.com/@shashwath.k.s5239',
      profileImg: `https://unavatar.io/youtube/${extractIdentifier('https://www.youtube.com/@shashwath.k.s5239')}`,
    },
  ];

  const projects = [
    {
      title: 'E-commerce Dashboard',
      description: 'A comprehensive dashboard for managing products, orders, and customers, built with React and Chart.js.',
      imageUrl: 'https://placehold.co/600x400/1A202C/E2E8F0?text=Project+1',
      liveUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'Task Management App',
      description: 'A sleek and intuitive task manager with drag-and-drop functionality, powered by Firebase and Tailwind CSS.',
      imageUrl: 'https://placehold.co/600x400/1A202C/E2E8F0?text=Project+2',
      liveUrl: '#',
      sourceUrl: '#',
    },
    {
      title: 'Personal Blog Platform',
      description: 'A fully-featured blogging platform with a Markdown editor and static site generation for optimal performance.',
      imageUrl: 'https://placehold.co/600x400/1A202C/E2E8F0?text=Project+3',
      liveUrl: '#',
      sourceUrl: '#',
    },
  ];

  const skills = [
    { name: 'React', icon: <FaReact className="text-blue-400" /> },
    { name: 'JavaScript (ES6+)', icon: <SiJavascript className="text-yellow-400" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-400" /> },
    { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
    { name: 'Figma', icon: <FaFigma className="text-pink-500" /> },
  ];

  return (
    <>
      <PageSwitching isLoading={loading} />
      {!loading && (
        <div className="font-[Montserrat] min-h-screen bg-gray-900 text-white px-4 sm:px-6 py-16">
          <div className="max-w-7xl mx-auto">

            {/* === AUTHOR SECTION === */}
            <motion.section
              className="max-w-6xl mx-auto bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10 mb-24"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
                <p className="text-gray-300 leading-relaxed text-justify">
                  Hi! I’m Shashwath, the creator of Project Lima — a digital-first enthusiast passionate about building thoughtful, modern, and clean interfaces...
                </p>
              </div>
              <div className="relative w-80 h-96 shrink-0 group">
                <motion.img
                  src="../../assets/about/card_bg.png"
                  alt="Card Background"
                  className="absolute inset-0 w-full h-full z-0 transition-transform duration-500 ease-in-out group-hover:scale-110"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <img
                  src="../../assets/about/profile.png"
                  alt="Author"
                  className="relative z-10 w-full h-full object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            </motion.section>

            {/* === SOCIALS === */}
            <motion.section
              className="mb-24"
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={sectionVariants}
            >
              <h2 className="text-3xl font-bold text-center mb-10">Connect With Me</h2>
              <SocialCardGrid>
                {socials.map((s) => (
                  <SocialCard key={s.link} {...s} />
                ))}
              </SocialCardGrid>
            </motion.section>
            {/* === PROJECTS === */}
            <motion.section
              className="mb-24"
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={sectionVariants}
            >
              <h2 className="text-3xl font-bold text-center mb-10">My Recent Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700 group hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="aspect-[16/9]">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between h-full">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <a
                          href={project.liveUrl}
                          className="flex items-center gap-2 text-sm text-indigo-400 hover:underline"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                        <a
                          href={project.sourceUrl}
                          className="flex items-center gap-2 text-sm text-indigo-400 hover:underline"
                        >
                          <FaCode /> Source
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* === SKILLS === */}
            <motion.section
              className="mb-24"
              initial="hidden"
              animate="visible"
              custom={0.6}
              variants={sectionVariants}
            >
              <h2 className="text-3xl font-bold text-center mb-10">Skills & Expertise</h2>
              <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-800 rounded-full px-5 py-2 shadow-sm border border-gray-700 hover:shadow-md transition"
                  >
                    <span className="mr-3 text-xl">{skill.icon}</span>
                    <span className="font-medium text-gray-200 text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.section>


            {/* === CONTACT === */}
            <motion.section
              className="text-center"
              initial="hidden"
              animate="visible"
              custom={0.8}
              variants={sectionVariants}
            >
              <h2 className="text-3xl font-bold mb-4">Let's Build Something Great</h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Have a project in mind or just want to connect? I'm always open to new opportunities and collaborations.
              </p>
              <a
                href="mailto:shashwathk15@gmail.com"
                className="inline-block bg-indigo-600 text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </a>
            </motion.section>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
