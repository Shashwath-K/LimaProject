import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaSpotify,
  FaDiscord,
  FaYoutube,
} from 'react-icons/fa';
import SocialCard, { SocialCardGrid } from '../cards/SocialCard';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';

// Helper function to extract username/ID from a URL
const extractIdentifier = (url) => {
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    if (hostname.includes('facebook.com') && searchParams.get('id')) {
      return searchParams.get('id'); // For links like facebook.com/profile.php?id=...
    }
    // For links like x.com/username, github.com/username, youtube.com/@username
    return pathname.split('/').pop();
  } catch (e) {
    console.error('Invalid URL:', e);
    return 'default'; // Fallback
  }
};

// --- Updated Socials Array ---
const socials = [
  {
    name: 'Shashwath K',
    platform: 'facebook',
    icon: <FaFacebookF />,
    link: 'https://www.facebook.com/profile.php?id=100009465161906',
    // Dynamically gets the profile image using the user ID
    profileImg: `https://unavatar.io/facebook/${extractIdentifier('https://www.facebook.com/profile.php?id=100009465161906')}`,
  },
  {
    name: 'Shashwath K',
    platform: 'twitter',
    icon: <FaTwitter />,
    link: 'https://x.com/shashwath_k15',
    // Dynamically gets the profile image using the username
    profileImg: `https://unavatar.io/twitter/${extractIdentifier('https://x.com/shashwath_k15')}`,
  },
  {
    name: 'Shashwath K',
    platform: 'github',
    icon: <FaGithub />,
    link: 'https://github.com/shashwath-k', // Example GitHub link
    profileImg: `https://unavatar.io/github/shashwath-k`,
  },
  {
    name: 'Spotify Profile',
    platform: 'spotify',
    icon: <FaSpotify />,
    link: 'https://open.spotify.com/user/31omectxpm23tbqslxwj5b24a5qa', // NOTE: Real Spotify user link required
    profileImg: `https://unavatar.io/spotify/31omectxpm23tbqslxwj5b24a5qa`, // Uses the user ID
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

const About = () => {
  return (
    <div className="font-[Montserrat] min-h-screen bg-gray-900 text-gray-800 px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl text-white font-bold text-center mb-12">About</h1>

      {/* Author Section (No changes here) */}
      <section className="max-w-6xl mx-auto bg-gray-700 text-white shadow-lg rounded-xl p-8 relative flex flex-col md:flex-row items-center gap-10 overflow-visible">
        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
          <p className="text-white-600 leading-relaxed text-justify">
            Hi! I’m the creator of Project Lima — a digital-first enthusiast passionate about building thoughtful, modern, and clean interfaces. I love crafting great user experiences, working with React and Tailwind CSS, and making beautiful things on the web.
            <br /><br />
            This project reflects my love for minimalism and performance. Thanks for stopping by!
          </p>
        </div>
        <div className="relative w-80 h-full shrink-0 z-10">
          <motion.img
            src="../../assets/about/card_bg.png"
            alt="Card Background"
            className="absolute w-full h-full z-0"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img
            src="../../assets/about/profile.png"
            alt="Author"
            className="relative z-10 w-full h-full object-contain p-4 rounded-xl"
          />
        </div>
      </section>

      {/* Social Cards Section */}
      <section className="mt-16">
        <h3 className="text-xl font-semibold text-white text-center mb-6">Connect with me</h3>
        <SocialCardGrid>
          {socials.map((s) => (
            <SocialCard
              key={s.link} // Use the link as a key for better uniqueness
              icon={s.icon}
              profileImg={s.profileImg}
              name={s.name}
              link={s.link}
              platform={s.platform}
            />
          ))}
        </SocialCardGrid>
      </section>
    </div>
  );
};

export default About;