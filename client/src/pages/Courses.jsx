import React from 'react';
import { courses } from '../data/mockData';
import { PlayCircle } from 'lucide-react';

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
                    Details
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
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-slate-300 rounded-full"
                        style={{ width: `${course.progress}%` }}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default function Courses() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">All Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}
