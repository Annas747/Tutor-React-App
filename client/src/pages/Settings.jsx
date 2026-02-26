import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Bell, Shield, Moon } from 'lucide-react';

export default function Settings() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = React.useRef(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setErrorMessage('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            setErrorMessage('Image size must be less than 5MB');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        // Read file
        const reader = new FileReader();

        reader.onerror = () => {
            setErrorMessage('Failed to read the image file. Please try again.');
            setTimeout(() => setErrorMessage(''), 5000);
        };

        reader.onloadend = () => {
            try {
                setAvatarUrl(reader.result);
                setErrorMessage('');
            } catch (error) {
                console.error('Error setting avatar:', error);
                setErrorMessage('Failed to load the image. Please try again.');
                setTimeout(() => setErrorMessage(''), 5000);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API update
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your account settings and preferences.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                        <User size={18} className="text-primary-600" />
                        Profile Information
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {successMessage && (
                        <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 mb-4">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex items-center gap-4 mb-6">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-sm ring-1 ring-slate-100"
                            />
                        ) : (
                            <div className="h-16 w-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm ring-1 ring-slate-100">
                                {formData.name.charAt(0) || 'U'}
                            </div>
                        )}
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                                type="button"
                                onClick={handleAvatarClick}
                            >
                                Change Avatar
                            </Button>
                            <p className="text-xs text-slate-400 mt-1">Max 5MB (JPEG, PNG, GIF, WebP)</p>
                        </div>
                    </div>

                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                    />
                    <p className="text-xs text-slate-400 -mt-3">Email cannot be changed in this demo.</p>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" isLoading={isLoading}>Save Changes</Button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                        <Bell size={18} className="text-amber-500" />
                        Notifications
                    </h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded text-primary-600 focus:ring-primary-500" />
                            Email notifications
                        </label>
                        <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded text-primary-600 focus:ring-primary-500" />
                            Community mentions
                        </label>
                        <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                            Course updates
                        </label>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                        <Moon size={18} className="text-indigo-500" />
                        Appearance
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Dark Mode</span>
                            <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer opacity-50">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400">Dark mode is coming soon!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
