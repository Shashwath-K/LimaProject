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

const socials = [
  {
    name: 'Facebook User',
    platform: 'facebook',
    icon: <FaFacebookF />,
    profileImg: 'https://placehold.co/100x100?text=FB',
    link: 'https://facebook.com',
  },
  {
    name: 'Twitter User',
    platform: 'twitter',
    icon: <FaTwitter />,
    profileImg: 'https://placehold.co/100x100?text=TW',
    link: 'https://twitter.com',
  },
  {
    name: 'Spotify Fan',
    platform: 'spotify',
    icon: <FaSpotify />, // custom or use Lucide+Heroicons
    profileImg: 'https://placehold.co/100x100?text=SP',
    link: 'https://spotify.com',
  },
  {
    name: 'Discord User',
    platform: 'discord',
    icon: <FaDiscord />,
    profileImg: 'https://placehold.co/100x100?text=DC',
    link: 'https://discord.com',
  },
  {
    name: 'YouTube Creator',
    platform: 'youtube',
    icon: <FaYoutube />,
    profileImg: 'https://placehold.co/100x100?text=YT',
    link: 'https://youtube.com',
  },
];


const About = () => {
    return (
        <div className="font-[Montserrat] min-h-screen bg-gray-900 text-gray-800 px-6 py-12">
            {/* Heading */}
            <h1 className="text-4xl text-white font-bold text-center mb-12">About</h1>

            {/* Author Section */}
            <section className="max-w-6xl mx-auto bg-gray-700 text-white shadow-lg rounded-xl p-8 relative flex flex-col md:flex-row items-center gap-10 overflow-visible">
            {/* Description */}
            <div className="flex-1 text-center md:text-left z-10">
                <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
                <p className="text-white-600 leading-relaxed text-justify">
                Hi! I’m the creator of Project Lima — a digital-first enthusiast passionate about building thoughtful,
                modern, and clean interfaces. I love crafting great user experiences, working with React and Tailwind CSS, and making beautiful things on the web.
                <br /><br />
                This project reflects my love for minimalism and performance. Thanks for stopping by!
                </p>
            </div>

            {/* Profile + Floating Oversized Background Card */}
            <div className="relative w-80 h-full shrink-0 z-10">
                {/* Animated, oversized background card */}
                <motion.img
                src="../../assets/about/card_bg.png"
                alt="Card Background"
                className="absolute w-full h-full z-0"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                />

                {/* Profile image over the card */}
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
                    key={s.name}
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
