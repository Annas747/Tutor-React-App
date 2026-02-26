import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, to, color }) => (
    <Link
        to={to}
        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
    >
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <Icon size={24} className="text-white" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center text-primary-600 font-medium text-sm">
            Explore <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
    </Link>
);

export default function Overview() {
    return (
        <div className="space-y-10 animate-in fade-in zoom-in duration-500">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl font-bold mb-4 leading-tight">
                        Master New Skills with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">AI-Powered Learning</span>
                    </h1>
                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                        Welcome to EduAI. Your personalized platform for interactive learning, real-time feedback, and smart progress tracking.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/courses" className="bg-white text-primary-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20">
                            Browse Courses
                        </Link>
                        <Link to="/tutor" className="bg-primary-700/50 backdrop-blur-sm text-white border border-primary-500/50 px-6 py-3 rounded-xl font-semibold hover:bg-primary-700/70 transition-colors">
                            Try AI Tutor
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Access Grid */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <BookOpen size={24} className="text-slate-400" />
                    Platform Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={BookOpen}
                        title="Interactive Courses"
                        description="Access our library of high-quality courses with progress tracking and quizzes."
                        to="/courses"
                        color="bg-blue-500"
                    />
                    <FeatureCard
                        icon={Users}
                        title="Student Community"
                        description="Connect with peers and instructors for collaborative learning and support."
                        to="/community"
                        color="bg-violet-500"
                    />
                    <FeatureCard
                        icon={Trophy}
                        title="AI Personal Tutor"
                        description="Get instant answers, explanations, and personalized study tips 24/7."
                        to="/tutor"
                        color="bg-amber-500"
                    />
                </div>
            </div>
        </div>
    );
}
