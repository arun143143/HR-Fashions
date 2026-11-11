import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { site } from '../../data/site';
import { serviceList } from '../../data/services';

const quickLinks = [
    { name: 'All Services', path: '/services' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Book Appointment', path: '/book-appointment' },
];

const socials = [
    { name: 'Instagram', href: site.social.instagram, Icon: Instagram },
    { name: 'Facebook', href: site.social.facebook, Icon: Facebook },
].filter((s) => s.href);

const FooterLink = ({ to, children }) => (
    <Link to={to} className="text-gray-400 hover:text-gold-500 flex items-center gap-2 transition-colors">
        <ChevronRight size={14} className="text-gold-500" /> {children}
    </Link>
);

const Footer = () => (
    <footer className="bg-black-950 text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                    <h2 className="font-serif text-3xl font-bold mb-6">{site.brandMark}<span className="text-gold-500">.</span></h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Experience the finest bespoke tailoring delivered to your doorstep. We combine traditional craftsmanship with modern convenience.
                    </p>
                    {socials.length > 0 && (
                        <div className="flex gap-4">
                            {socials.map(({ name, href, Icon }) => (
                                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="w-10 h-10 bg-black-800 flex items-center justify-center hover:bg-gold-500 hover:text-black-950 text-gray-400 transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-6 border-l-4 border-gold-500 pl-4 uppercase tracking-wider">Services</h3>
                    <ul className="space-y-3">
                        {serviceList.map((s) => (
                            <li key={s.slug}><FooterLink to={`/services/${s.slug}`}>{s.name}</FooterLink></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-6 border-l-4 border-gold-500 pl-4 uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-3">
                        {quickLinks.map((l) => (
                            <li key={l.path}><FooterLink to={l.path}>{l.name}</FooterLink></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-6 border-l-4 border-gold-500 pl-4 uppercase tracking-wider">Contact Us</h3>
                    <div className="space-y-4 text-gray-400">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-gold-500 shrink-0 mt-1" size={20} />
                            <p>{site.address}</p>
                        </div>
                        <a href={site.phoneHref} className="flex items-center gap-4 hover:text-gold-500 transition-colors">
                            <Phone className="text-gold-500 shrink-0" size={20} />
                            <span>{site.phone}</span>
                        </a>
                        <a href={`mailto:${site.email}`} className="flex items-center gap-4 hover:text-gold-500 transition-colors">
                            <Mail className="text-gold-500 shrink-0" size={20} />
                            <span>{site.email}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-sm text-gray-500 text-center md:text-left">
                <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
