import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import ServicePage from './pages/ServicePage';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-black-950 text-white font-sans selection:bg-gold-500 selection:text-white">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/book-appointment" element={<BookAppointment />} />
                        <Route path="/services/:category" element={<ServicePage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
