import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Facebook,
    Twitter,
    Linkedin,
    Github
} from "lucide-react";
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setYear(new Date().getFullYear());
        }, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-gray-900 text-white font-[Montserrat] py-10 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo + Description */}
                <div>
                    <motion.img
                        src="/assets/min-logo/lima-logo-minimal.png"
                        alt="Project Lima"
                        className="h-16 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x40?text=Lima"; }}
                    />
                    <p className="text-sm text-gray-400">
                        Empowering the next generation of digital solutions. Built with love and code.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition">LINK#1</a></li>
                        <li><a href="#" className="hover:text-white transition">LINK#2</a></li>
                        <li><a href="#" className="hover:text-white transition">LINK#3</a></li>
                        <li><a href="#" className="hover:text-white transition">LINK#4</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                        <li>Email: <a href="mailto:support@lima.app" className="hover:text-white">support@lima.app</a></li>
                        <li>Phone: <a href="tel:+1234567890" className="hover:text-white">+1 234 567 890</a></li>
                        <li>Location: Remote / Global</li>
                    </ul>
                </div>

                {/* Social + CTA */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-400 transition"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-sky-400 transition"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-blue-300 transition"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-gray-300 transition"><Github size={20} /></a>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition"
                        onClick={() => navigate('/home')}
                    >
                        Go to Homepage
                    </motion.button>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-700" />

            {/* Bottom Row */}
            <div className="text-center text-xs text-gray-500">
                © {year} Project Lima. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
