import { Component } from 'react';

// Shows a friendly message instead of a blank page if something unexpected breaks.
export default class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.error(error);
    }

    render() {
        if (!this.state.hasError) return this.props.children;
        return (
            <div className="pt-40 pb-24 container mx-auto px-6 text-center">
                <h1 className="font-serif text-3xl text-white mb-4">Something went wrong</h1>
                <p className="text-gray-400 mb-8">Please refresh the page. If it keeps happening, call us.</p>
                <button className="btn-gold" onClick={() => window.location.reload()}>Refresh</button>
            </div>
        );
    }
}
