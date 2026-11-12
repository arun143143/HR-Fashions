import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminRoute = () => {
    const { user, profile, loading, isConfigured } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4" role="status" aria-label="Checking admin authorization">
                <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                <p className="text-black-300 text-sm">Verifying administrator permissions...</p>
            </div>
        );
    }

    if (!isConfigured) {
        return (
            <div className="container mx-auto px-6 py-24 text-center max-w-xl">
                <div className="zari-frame bg-black-900 p-8">
                    <h2 className="font-serif text-2xl font-semibold text-gold-300 mb-3">Supabase Not Configured</h2>
                    <p className="text-black-200 text-sm mb-6 leading-relaxed">
                        Database authentication requires Supabase environment variables in <code className="text-gold-400 bg-black-950 px-2 py-0.5 border border-white/10">.env.local</code>.
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Role verification against the verified database profile
    if (profile?.role !== 'admin') {
        return (
            <div className="container mx-auto px-6 py-24 text-center max-w-xl">
                <div className="zari-frame bg-black-900 p-8 md:p-12">
                    <div className="w-12 h-12 mx-auto mb-4 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-3">Admin Access Required</h2>
                    <p className="text-black-200 text-sm mb-6 leading-relaxed">
                        Your account ({user.email}) does not have administrator privileges. If this is a shop administrator account, assign the <code className="text-gold-300">admin</code> role in the database.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/account" className="btn-gold !py-2.5 !px-5 text-sm">
                            Return to My Account
                        </Link>
                        <Link to="/" className="btn-outline-gold !py-2.5 !px-5 text-sm">
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return <Outlet />;
};

export default AdminRoute;
