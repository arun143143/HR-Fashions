import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black-950 text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <h2 className="font-serif text-3xl font-bold mb-6">HRFASHIONS<span className="text-gold-500">.</span></h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Experience the finest bespoke tailoring delivered to your doorstep. We combine traditional craftsmanship with modern convenience.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-black-800 flex items-center justify-center hover:bg-gold-500 hover:text-white text-gray-400 transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-l-4 border-gold-500 pl-4 uppercase tracking-wider">Services</h4>
                        <ul className="space-y-3">
                            {['Blouse Stitching', 'Suit Salwar', 'Lehenga Choli', 'Kids Frock', 'Western Gowns', 'Alterations'].map((item) => (
                                <li key={item}>
                                    <Link to={`/services/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-gold-500 flex items-center gap-2 transition-colors">
                                        <ChevronRight size={14} className="text-gold-500" /> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-l-4 border-gold-500 pl-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3">
                            {['About Us', 'How It Works', 'Pricing', 'Book Appointment', 'Contact Us', 'FAQs'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-gold-500 flex items-center gap-2 transition-colors">
                                        <ChevronRight size={14} className="text-gold-500" /> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 border-l-4 border-gold-500 pl-4 uppercase tracking-wider">Contact Us</h4>
                        <div className='space-y-4 text-gray-400'>
                            <div className="flex items-start gap-4">
                                <MapPin className="text-gold-500 shrink-0 mt-1" size={20} />
                                <p>16/95, Ottagapalayam, Sector 15, Vadapalani, Chennai, Tamil Nadu 600078</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="text-gold-500 shrink-0" size={20} />
                                <p>+91 882-646-6345</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-gold-500 shrink-0" size={20} />
                                <p>contact@hrfashions.in</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 HR Fashions. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gold-500">Privacy Policy</a>
                        <a href="#" className="hover:text-gold-500">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
