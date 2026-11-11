import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { site, mapHref } from '../../data/site';
import { serviceList } from '../../data/services';

const quickLinks = [
    { name: 'All services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Book an appointment', path: '/book-appointment' },
];

const socials = [
    { name: 'Instagram', href: site.social.instagram, Icon: Instagram },
    { name: 'Facebook', href: site.social.facebook, Icon: Facebook },
].filter((s) => s.href);

const linkClass = 'text-black-300 hover:text-gold-300 transition-colors';
const headingClass = 'font-serif text-xl font-semibold text-white mb-5';

const Footer = () => (
    <footer className="bg-black-950 text-white">
        <div className="zari-band" aria-hidden="true" />
        <div className="border-t border-gold-500">
            <div className="container mx-auto px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">
                    <div className="lg:col-span-4">
                        <p className="font-serif text-3xl font-semibold mb-4">{site.name}</p>
                        <p className="text-black-300 leading-relaxed max-w-xs">{site.tagline}, made to your measurements in Chennai.</p>
                        {socials.length > 0 && (
                            <div className="flex gap-3 mt-6">
                                {socials.map(({ name, href, Icon }) => (
                                    <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="w-11 h-11 border border-gold-500/50 flex items-center justify-center text-gold-300 hover:bg-gold-500 hover:text-black-950 transition-colors">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <nav className="lg:col-span-2" aria-label="Services">
                        <h2 className={headingClass}>Services</h2>
                        <ul className="space-y-3">
                            {serviceList.map((s) => (
                                <li key={s.slug}><Link to={`/services/${s.slug}`} className={linkClass}>{s.name}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    <nav className="lg:col-span-2" aria-label="Quick links">
                        <h2 className={headingClass}>Quick links</h2>
                        <ul className="space-y-3">
                            {quickLinks.map((l) => (
                                <li key={l.path}><Link to={l.path} className={linkClass}>{l.name}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    <div className="lg:col-span-4">
                        <h2 className={headingClass}>Visit or call</h2>
                        <div className="space-y-4 text-black-300">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-gold-500 shrink-0 mt-1" size={20} aria-hidden="true" />
                                <p>
                                    {site.address}
                                    <a href={mapHref} target="_blank" rel="noopener noreferrer" className="block mt-1 text-gold-300 underline underline-offset-4 hover:text-white transition-colors">
                                        Open in Google Maps
                                    </a>
                                </p>
                            </div>
                            {site.hours && (
                                <div className="flex items-start gap-4">
                                    <Clock className="text-gold-500 shrink-0 mt-1" size={20} aria-hidden="true" />
                                    <p>{site.hours}</p>
                                </div>
                            )}
                            <a href={site.phoneHref} className={`flex items-center gap-4 ${linkClass}`}>
                                <Phone className="text-gold-500 shrink-0" size={20} aria-hidden="true" />
                                <span>{site.phone}</span>
                            </a>
                            <a href={`mailto:${site.email}`} className={`flex items-center gap-4 ${linkClass}`}>
                                <Mail className="text-gold-500 shrink-0" size={20} aria-hidden="true" />
                                <span>{site.email}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <p className="border-t border-white/10 pt-8 text-sm text-black-400">
                    © {new Date().getFullYear()} {site.name}. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
