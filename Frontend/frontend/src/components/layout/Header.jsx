import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Ladies Tailoring', path: '/services/ladies' },
        { name: 'Kids Wear', path: '/services/kids' },
        { name: 'How It Works', path: '/how-it-works' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black-950/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white transition-colors">
                            HRFASHIONS<span className="text-gold-500">.</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-semibold uppercase tracking-widest text-white/80 hover:text-gold-500 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    <a
                        href="tel:+918826466345"
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-gold-500 transition-colors"
                    >
                        <Phone size={18} className="text-gold-500" />
                        <span>+91 882-646-6345</span>
                    </a>
                    <Link to="/book-appointment" className="btn-gold">
                        Book Appointment
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden text-white hover:text-gold-500 transition-colors"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-black-900 border-t border-white/10 py-8 px-6 flex flex-col gap-4 lg:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white text-lg font-medium border-b border-white/5 py-3 block hover:text-gold-500"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/book-appointment"
                        onClick={() => setIsMenuOpen(false)}
                        className="btn-gold text-center mt-4 w-full"
                    >
                        Book Appointment
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
