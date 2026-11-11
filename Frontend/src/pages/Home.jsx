import Hero from '../components/ui/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Truck, Clock } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { serviceList } from '../data/services';

const Home = () => {
    useDocumentMeta('', 'HR Fashions: bespoke ladies and kids tailoring in Chennai. Blouses, lehengas, anarkalis, kurtis, suits and frocks, with home measurement and delivery.');

    const features = [
        { icon: Truck, title: 'Doorstep Service', desc: 'Measurements and delivery at your home.' },
        { icon: Ruler, title: 'Perfect Fit', desc: 'Guaranteed fit with free alterations.' },
        { icon: Clock, title: 'On-Time Delivery', desc: 'Fast turnaround times for all orders.' },
        { icon: Scissors, title: 'Expert Tailors', desc: 'Stitched by experienced masters.' },
    ];

    return (
        <div className="bg-black-950">
            <Hero />

            {/* Services Section */}
            <section className="py-24 container mx-auto px-6">
                <SectionTitle
                    title="Services We Offer"
                    subtitle="From traditional wear to modern western outfits, we stitch it all with perfection."
                    centered
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
                    {serviceList.map((service) => (
                        <Link to={`/services/${service.slug}`} key={service.slug} className="group text-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-2 border-gold-500/30 group-hover:border-gold-500 transition-all duration-300 relative">
                                <OptimizedImage
                                    src={service.heroImg}
                                    alt={service.name}
                                    width={160}
                                    height={160}
                                    widths={[160, 320]}
                                    sizes="160px"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black-950/20 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <h3 className="mt-4 text-white font-medium group-hover:text-gold-500 transition-colors uppercase tracking-wide text-sm">
                                {service.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-black-900 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {features.map((feature, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-16 h-16 mx-auto bg-black-800 rounded-full flex items-center justify-center text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-black-950 transition-all duration-300">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 container mx-auto px-6 text-center">
                <div className="bg-gradient-to-r from-black-900 to-black-800 border border-white/10 p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                            Ready to Upgrade Your Style?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Book a home visit today and experience the luxury of custom tailoring.
                        </p>
                        <Link to="/book-appointment" className="btn-gold">
                            Book Appointment Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
