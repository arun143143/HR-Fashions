import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { site } from '../../data/site';

const navLinks = [
    { name: 'Home', path: '/', end: true },
    { name: 'Services', path: '/services' },
    { name: 'Kids Wear', path: '/services/kids-frock' },
    { name: 'How It Works', path: '/how-it-works' },
];

const linkClass = ({ isActive }) =>
    `text-sm font-semibold uppercase tracking-widest transition-colors hover:text-gold-500 ${isActive ? 'text-gold-500' : 'text-white/80'}`;

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the mobile menu whenever the page changes.
    useEffect(() => setIsMenuOpen(false), [pathname]);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-black-950/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white" aria-label={`${site.name} home`}>
                    {site.brandMark}<span className="text-gold-500">.</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
                    {navLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} end={link.end} className={linkClass}>
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-6">
                    <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-medium text-white hover:text-gold-500 transition-colors">
                        <Phone size={18} className="text-gold-500" />
                        <span>{site.phone}</span>
                    </a>
                    <Link to="/book-appointment" className="btn-gold">Book Appointment</Link>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="lg:hidden text-white hover:text-gold-500 transition-colors"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-black-900 border-t border-white/10 py-8 px-6 flex flex-col gap-4 lg:hidden" aria-label="Mobile">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.end}
                            className={({ isActive }) =>
                                `text-lg font-medium border-b border-white/5 py-3 block hover:text-gold-500 ${isActive ? 'text-gold-500' : 'text-white'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <Link to="/book-appointment" className="btn-gold text-center mt-4 w-full">Book Appointment</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
