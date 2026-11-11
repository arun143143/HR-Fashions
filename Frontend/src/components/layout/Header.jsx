import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { site } from '../../data/site';

const navLinks = [
    { name: 'Services', path: '/services', end: true },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Kids wear', path: '/services/kids-frock' },
    { name: 'How it works', path: '/how-it-works' },
];

const linkClass = ({ isActive }) =>
    `text-[15px] font-bold transition-colors hover:text-gold-300 ${isActive ? 'text-gold-300' : 'text-white/85'}`;

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
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled || isMenuOpen ? 'bg-black-950/95 backdrop-blur-md border-gold-500/30 py-3' : 'bg-black-950 border-transparent py-5'}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="font-serif text-2xl md:text-[1.75rem] font-semibold tracking-tight text-white" aria-label={`${site.name} home`}>
                    {site.name}
                </Link>

                <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
                    {navLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} end={link.end} className={linkClass}>
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-6">
                    <a href={site.phoneHref} className="flex items-center gap-2 text-[15px] font-bold text-white hover:text-gold-300 transition-colors">
                        <Phone size={18} className="text-gold-500" aria-hidden="true" />
                        <span>{site.phone}</span>
                    </a>
                    <Link to="/book-appointment" className="btn-gold !px-5 !py-2.5">Book an appointment</Link>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="lg:hidden text-white hover:text-gold-300 transition-colors p-2 -mr-2"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-black-950 border-t border-white/10 py-6 px-6 flex flex-col lg:hidden" aria-label="Mobile">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.end}
                            className={({ isActive }) =>
                                `text-lg font-bold border-b border-white/10 py-4 block hover:text-gold-300 ${isActive ? 'text-gold-300' : 'text-white'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <a href={site.phoneHref} className="flex items-center gap-3 py-4 text-lg font-bold text-white">
                        <Phone size={18} className="text-gold-500" aria-hidden="true" /> {site.phone}
                    </a>
                    <Link to="/book-appointment" className="btn-gold text-center mt-2 w-full">Book an appointment</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
