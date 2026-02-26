import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 max-w-md w-full">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-red-100 p-4 rounded-full mb-4">
                                <AlertTriangle className="text-red-600" size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-slate-600 mb-6">
                                We encountered an unexpected error. Don't worry, your data is safe.
                            </p>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="w-full mb-4 text-left">
                                    <summary className="cursor-pointer text-sm font-medium text-slate-700 mb-2">
                                        Error Details (Development Only)
                                    </summary>
                                    <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-700 overflow-auto max-h-40">
                                        <p className="font-bold text-red-600 mb-2">{this.state.error.toString()}</p>
                                        <pre className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
                                    </div>
                                </details>
                            )}

                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors w-full"
                            >
                                Return to Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
