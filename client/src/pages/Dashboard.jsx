import React from 'react';
import { BookOpen, Clock, Award, TrendingUp, PlayCircle } from 'lucide-react';
import { userData, courses, activities } from '../data/mockData';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
    </div>
);

const CourseCard = ({ course }) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all group">
        <div className="h-48 overflow-hidden relative">
            <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <PlayCircle size={20} />
                    Continue
                </button>
            </div>
        </div>
        <div className="p-5">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-primary-50 text-primary-700 rounded-md">
                    {course.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <span>★</span> {course.rating}
                </div>
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-2">{course.title}</h3>
            <p className="text-sm text-slate-500 mb-4">by {course.instructor}</p>

            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>{course.progress}% Complete</span>
                    <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${course.progress}%` }}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome back, {userData.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-500 mt-2">
                        You've learned for <span className="text-primary-600 font-bold">{userData.stats.hoursLearned} hours</span> this month. Keep it up!
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-bold flex items-center gap-2 border border-orange-100">
                        🔥 {userData.stats.streak} Day Streak
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={BookOpen}
                    label="Courses in Progress"
                    value={userData.stats.coursesCompleted}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Clock}
                    label="Hours Learned"
                    value={userData.stats.hoursLearned}
                    color="bg-violet-500"
                />
                <StatCard
                    icon={Award}
                    label="Total Points"
                    value={userData.stats.points.toLocaleString()}
                    color="bg-amber-500"
                />
            </div>

            {/* Continue Learning */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp size={24} className="text-primary-600" />
                        Continue Learning
                    </h2>
                    <button className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">
                        View All Courses
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.slice(0, 3).map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                {activity.type === 'completion' && <BookOpen size={18} className="text-green-600" />}
                                {activity.type === 'quiz' && <Award size={18} className="text-amber-500" />}
                                {activity.type === 'enrollment' && <PlayCircle size={18} className="text-blue-500" />}
                            </div>
                            <div>
                                <p className="text-slate-800 font-medium">{activity.message}</p>
                                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
