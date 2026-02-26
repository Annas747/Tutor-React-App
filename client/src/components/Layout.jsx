import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, LayoutDashboard, LogOut, MessageSquare, Settings, Bell, Search, Menu, X, Users } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

const SidebarItem = ({ icon: Icon, label, to, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                    ? "bg-primary-600 text-white shadow-md shadow-primary-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
        >
            <Icon size={20} className={clsx("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
            <span className="font-medium">{label}</span>
        </Link>
    );
};

export default function Layout() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            alert(`Searching for: ${searchQuery}`);
            // In a real app, this would navigate to a search results page
        }
    };

    return (
        <div className="flex h-screen bg-slate-50/50">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-40 transition-transform duration-300 md:translate-x-0 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-8 pb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-900">
                        <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-200">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">EduAI</span>
                    </div>
                    <button onClick={toggleMobileMenu} className="md:hidden text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-1 px-4">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
                    <SidebarItem icon={Home} label="Overview" to="/" onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarItem icon={BookOpen} label="My Courses" to="/courses" onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarItem icon={Users} label="Community" to="/community" onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarItem icon={MessageSquare} label="AI Tutor" to="/tutor" onClick={() => setIsMobileMenuOpen(false)} />
                </div>

                <div className="mt-auto p-6 border-t border-slate-50">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Account</p>
                    <SidebarItem icon={Settings} label="Settings" to="/settings" onClick={() => setIsMobileMenuOpen(false)} />
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1 group"
                    >
                        <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 overflow-auto bg-slate-50/50 min-h-screen">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-4 sticky top-0 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <button onClick={toggleMobileMenu} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                            <Menu size={24} />
                        </button>
                        <form onSubmit={handleSearch} className="relative w-full max-w-md hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for courses, lessons..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all"
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-lg hover:text-slate-600 transition-colors"
                            >
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            {/* Notification Dropdown */}
                            {isNotificationOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsNotificationOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-20 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="p-4 border-b border-slate-100">
                                            <h3 className="font-semibold text-slate-800">Notifications</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            <Link
                                                to="/courses"
                                                onClick={() => setIsNotificationOpen(false)}
                                                className="block p-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer transition-colors"
                                            >
                                                <p className="text-sm font-medium text-slate-800">New course available</p>
                                                <p className="text-xs text-slate-500 mt-1">Advanced React Patterns is now live</p>
                                                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                                            </Link>
                                            <Link
                                                to="/community"
                                                onClick={() => setIsNotificationOpen(false)}
                                                className="block p-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer transition-colors"
                                            >
                                                <p className="text-sm font-medium text-slate-800">Community message</p>
                                                <p className="text-xs text-slate-500 mt-1">Instructor Alice mentioned you</p>
                                                <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
                                            </Link>
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setIsNotificationOpen(false)}
                                                className="block p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                                            >
                                                <p className="text-sm font-medium text-slate-800">Course progress</p>
                                                <p className="text-xs text-slate-500 mt-1">You completed 50% of JavaScript Basics</p>
                                                <p className="text-xs text-slate-400 mt-1">1 day ago</p>
                                            </Link>
                                        </div>
                                        <div className="p-3 border-t border-slate-100 text-center">
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setIsNotificationOpen(false)}
                                                className="text-sm text-primary-600 font-medium hover:underline"
                                            >
                                                View all notifications
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

                        <div className="relative pl-2">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-xl transition-colors outline-none focus:ring-2 focus:ring-primary-100"
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold border-2 border-white shadow-sm ring-2 ring-slate-50">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-3 py-2 border-b border-slate-100 mb-1 md:hidden">
                                            <p className="font-semibold text-slate-800">{user?.name}</p>
                                            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                                        </div>

                                        <Link
                                            to="/settings"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                            className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                        >
                                            <Settings size={16} />
                                            Settings
                                        </Link>

                                        <button
                                            onClick={() => {
                                                setIsProfileMenuOpen(false);
                                                logout();
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8 max-w-7xl mx-auto pb-20">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
