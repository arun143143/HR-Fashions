import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, User } from '../ui/Icons';
import { site } from '../../data/site';
import { serviceList } from '../../data/services';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
    { name: 'Gallery', path: '/gallery' },
    { name: 'Prices', path: '/pricing' },
    { name: 'How it works', path: '/how-it-works' },
];

const linkBase = 'text-[15px] font-bold transition-colors hover:text-gold-300';
const linkClass = ({ isActive }) => `${linkBase} ${isActive ? 'text-gold-300' : 'text-white'}`;
const mobileLinkClass = ({ isActive }) =>
    `text-lg font-bold border-b border-white/10 py-4 block hover:text-gold-300 ${isActive ? 'text-gold-300' : 'text-white'}`;

// Desktop dropdown listing every service. Opens on hover, click or keyboard; closes on Escape or when focus leaves.
const ServicesMenu = ({ pathname }) => {
    const [open, setOpen] = useState(false);
    const wrap = useRef(null);
    const active = pathname.startsWith('/services');

    useEffect(() => setOpen(false), [pathname]);

    return (
        <div
            ref={wrap}
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onBlur={(e) => !wrap.current.contains(e.relatedTarget) && setOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
            <button
                type="button"
                aria-expanded={open}
                aria-controls="services-menu"
                onClick={() => setOpen((o) => !o)}
                className={`${linkBase} flex items-center gap-1 ${active ? 'text-gold-300' : 'text-white'}`}
            >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {open && (
                <div id="services-menu" className="absolute left-0 top-full w-64 pt-4">
                    <ul className="border border-gold-500/50 bg-black-950 py-2">
                        {serviceList.map((s) => (
                            <li key={s.slug}>
                                <Link to={`/services/${s.slug}`} className="block px-5 py-2.5 text-white hover:bg-black-900 hover:text-gold-300 transition-colors">
                                    {s.name}
                                </Link>
                            </li>
                        ))}
                        <li className="mt-2 border-t border-white/10 pt-2">
                            <Link to="/services" className="block px-5 py-2.5 font-bold text-gold-300 hover:bg-black-900 transition-colors">
                                All services
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

const Header = () => {
    const { user, profile } = useAuth();
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
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled || isMenuOpen ? 'bg-black-950/95 backdrop-blur-md border-gold-500/30 py-3' : 'bg-gradient-to-b from-black-950/80 to-transparent border-transparent py-5'}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="font-serif text-2xl md:text-[1.75rem] font-semibold tracking-tight text-white" aria-label={`${site.name} home`}>
                    {site.name}
                </Link>

                <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
                    <ServicesMenu pathname={pathname} />
                    {navLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} className={linkClass}>
                            {link.name}
                        </NavLink>
                    ))}
                    {user ? (
                        <>
                            {profile?.role === 'admin' && (
                                <NavLink to="/admin" className={linkClass}>
                                    Admin
                                </NavLink>
                            )}
                            <NavLink to="/account" className={linkClass}>
                                <span className="inline-flex items-center gap-1.5">
                                    <User size={15} />
                                    Account
                                </span>
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to="/login" className={linkClass}>
                            Sign In
                        </NavLink>
                    )}
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
                <nav className="absolute top-full left-0 w-full h-[calc(100svh-4.25rem)] overflow-y-auto bg-black-950 border-t border-white/10 py-6 px-6 flex flex-col lg:hidden" aria-label="Mobile">
                    <NavLink to="/services" end className={mobileLinkClass}>All services</NavLink>
                    <ul className="border-b border-white/10 py-2 pl-4">
                        {serviceList.map((s) => (
                            <li key={s.slug}>
                                <NavLink to={`/services/${s.slug}`} className={({ isActive }) => `block py-2.5 hover:text-gold-300 ${isActive ? 'text-gold-300' : 'text-black-200'}`}>
                                    {s.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    {navLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} className={mobileLinkClass}>
                            {link.name}
                        </NavLink>
                    ))}
                    {user ? (
                        <>
                            {profile?.role === 'admin' && (
                                <NavLink to="/admin" className={mobileLinkClass}>
                                    Admin Portal
                                </NavLink>
                            )}
                            <NavLink to="/account" className={mobileLinkClass}>
                                My Account
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to="/login" className={mobileLinkClass}>
                            Sign In
                        </NavLink>
                    )}
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
