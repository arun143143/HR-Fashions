import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ErrorBoundary from '../ui/ErrorBoundary';

const PageLoader = () => (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading">
        <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
    </div>
);

const Layout = () => (
    <div className="flex flex-col min-h-screen bg-black-950 text-white font-sans selection:bg-gold-500 selection:text-black-950">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
            <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </ErrorBoundary>
        </main>
        <Footer />
    </div>
);

export default Layout;
