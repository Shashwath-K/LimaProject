import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogIn, X } from 'lucide-react';

// Import Montserrat font
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinkVariants = {
        hover: {
            scale: 1.05,
            color: '#8B5CF6',
            transition: { duration: 0.2, ease: 'easeOut' }
        },
    };

    const mobileMenuOverlayVariants = {
        hidden: { opacity: 0, y: "-100vh" },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            y: "-100vh",
            transition: { duration: 0.4, ease: "easeIn" }
        },
    };

    const mobileMenuItemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        },
    };

    const headerHeight = '88px';

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-lg shadow-lg rounded-b-xl px-4 sm:px-6 lg:px-8 py-3 font-[Montserrat]">
                <div className="container mx-auto flex items-center justify-between h-16">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            aria-label="Toggle mobile menu"
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-grow md:flex-grow-0 flex justify-center md:justify-start">
                        <Link to="/" className="flex items-center space-x-2">
                            <motion.img
                                src="/assets/min-logo/lima-logo-minimal.png"
                                alt="Lima Logo"
                                className="h-32 object-contain"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/80x30/FFFFFF/000000?text=Lima";
                                }}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex flex-grow justify-center space-x-8">
                        {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-gray-700 font-medium px-4 py-2 rounded-full hover:bg-white/50 transition-colors duration-300"
                                variants={navLinkVariants}
                                whileHover="hover"
                            >
                                {item}
                            </motion.a>
                        ))}
                    </nav>

                    {/* Login Button */}
                    <div className="flex items-center md:ml-auto">
                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            <LogIn className="w-5 h-5" />
                            <span className="hidden sm:block">Login</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="fixed inset-0 min-h-screen bg-white/95 backdrop-blur-lg z-50 md:hidden flex flex-col items-center justify-center px-4"
                            variants={mobileMenuOverlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                aria-label="Close mobile menu"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <nav className="flex flex-col items-center space-y-6 text-2xl font-semibold text-gray-800 mt-12">
                                {['Home', 'Features', 'Pricing', 'Contact'].map((item, index) => (
                                    <motion.a
                                        key={item}
                                        href="#"
                                        className="hover:text-purple-600 transition-colors"
                                        variants={mobileMenuItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </motion.a>
                                ))}

                                <motion.hr className="w-24 border-gray-300 my-4" variants={mobileMenuItemVariants} />

                                <motion.a
                                    href="/login"
                                    className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
                                    variants={mobileMenuItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.5 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <LogIn className="w-6 h-6" /> Login
                                </motion.a>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

            </header>

            {/* Spacer */}
            <div style={{ height: headerHeight }}></div>
        </>
    );
};

export default Header;
