import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = () => {
    const { user, loading, isConfigured } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4" role="status" aria-label="Loading authentication">
                <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                <p className="text-black-300 text-sm">Verifying your session...</p>
            </div>
        );
    }

    if (!isConfigured) {
        return (
            <div className="container mx-auto px-6 py-24 text-center max-w-xl">
                <div className="zari-frame bg-black-900 p-8">
                    <h2 className="font-serif text-2xl font-semibold text-gold-300 mb-3">Supabase Not Configured</h2>
                    <p className="text-black-200 text-sm mb-6 leading-relaxed">
                        Database authentication requires Supabase environment variables in <code className="text-gold-400 bg-black-950 px-2 py-0.5 border border-white/10">.env.local</code>. Please set <code className="text-gold-400">VITE_SUPABASE_URL</code> and <code className="text-gold-400">VITE_SUPABASE_ANON_KEY</code>.
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login while preserving the current destination in route state
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
