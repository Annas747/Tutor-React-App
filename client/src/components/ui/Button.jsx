import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export const Button = ({ children, isLoading, variant = 'primary', className, ...props }) => {
    const baseStyles = "flex items-center justify-center px-6 py-2.5 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    };

    return (
        <button
            className={clsx(baseStyles, variants[variant], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Loading...
                </>
            ) : children}
        </button>
    );
};
