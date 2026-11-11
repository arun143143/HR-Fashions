import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';

// Only the home page ships in the first download; other pages load when visited.
const ServicesIndex = lazy(() => import('../pages/ServicesIndex'));
const ServicePage = lazy(() => import('../pages/ServicePage'));
const Gallery = lazy(() => import('../pages/Gallery'));
const HowItWorks = lazy(() => import('../pages/HowItWorks'));
const BookAppointment = lazy(() => import('../pages/BookAppointment'));
const NotFound = lazy(() => import('../pages/NotFound'));

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesIndex />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
