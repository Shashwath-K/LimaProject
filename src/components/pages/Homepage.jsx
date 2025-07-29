import React, { useState } from 'react';
import FeatureCard from './Home/FeatureCard';
import Heading from './Home/Heading';
import TextSection from './Home/TextSection';

const Homepage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const features = [
        { title: "Comprehensive Courses", description: "Dive deep into various subjects with our expertly curated courses. Learn at your own pace and track your progress.", imageUrl: "https://placehold.co/600x400/D1FAE5/10B981?text=Courses", buttonText: "Explore Courses", link: "#" },
        { title: "Interactive Quizzes", description: "Test your knowledge with engaging quizzes. Reinforce your learning and identify areas for improvement.", imageUrl: "https://placehold.co/600x400/DBEAFE/3B82F6?text=Quizzes", buttonText: "Take a Quiz", link: "#" },
        { title: "AI-Powered Tools", description: "Leverage cutting-edge AI features to enhance your learning experience and boost productivity.", imageUrl: "https://placehold.co/600x400/E0E7FF/6366F1?text=AI+Tools", buttonText: "Discover AI", link: "#" },
        { title: "Community & Support", description: "Connect with a vibrant community of learners. Share insights, ask questions, and get support.", imageUrl: "https://placehold.co/600x400/FFE4E6/EF4444?text=Community", buttonText: "Join Community", link: "#" },
        { title: "Progress Tracking", description: "Monitor your learning journey with detailed progress reports and analytics to stay on track.", imageUrl: "https://placehold.co/600x400/FEE2E2/EF4444?text=Progress", buttonText: "View Progress", link: "#" },
        { title: "Personalized Learning", description: "Receive tailored recommendations and content based on your learning style and goals.", imageUrl: "https://placehold.co/600x400/E0F2F7/0EA5E9?text=Personalized", buttonText: "Start Personalizing", link: "#" }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white font-inter py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Heading />
                <TextSection />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            index={index}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                            {...feature}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
