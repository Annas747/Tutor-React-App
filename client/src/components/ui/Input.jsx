import React, { forwardRef } from 'react';
import clsx from 'clsx';

export const Input = forwardRef(({ label, error, className, ...props }, ref) => {
    return (
        <div className="space-y-1">
            {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
            <input
                ref={ref}
                className={clsx(
                    "w-full px-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all",
                    error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-primary-500 focus:ring-primary-100",
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
