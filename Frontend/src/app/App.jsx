import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminRoute from '../components/auth/AdminRoute';

// Only the home page ships in the first download; other pages load when visited.
const ServicesIndex = lazy(() => import('../pages/ServicesIndex'));
const ServicePage = lazy(() => import('../pages/ServicePage'));
const Gallery = lazy(() => import('../pages/Gallery'));
const Pricing = lazy(() => import('../pages/Pricing'));
const HowItWorks = lazy(() => import('../pages/HowItWorks'));
const BookAppointment = lazy(() => import('../pages/BookAppointment'));
const Login = lazy(() => import('../pages/Login'));
const Account = lazy(() => import('../pages/Account'));
const Admin = lazy(() => import('../pages/Admin'));
const NotFound = lazy(() => import('../pages/NotFound'));

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<ServicesIndex />} />
                    <Route path="/services/:slug" element={<ServicePage />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/book-appointment" element={<BookAppointment />} />
                    <Route path="/login" element={<Login />} />

                    {/* Customer Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/account" element={<Account />} />
                    </Route>

                    {/* Admin Protected Routes */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin" element={<Admin />} />
                    </Route>

                    {/* Catch-all 404 */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
