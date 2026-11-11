import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { site } from '../../data/site';

const Hero = () => (
    <section className="relative h-screen min-h-[600px] flex items-center bg-black-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <OptimizedImage
                src={site.heroImage}
                alt="Elegant ladies outfit tailored by HR Fashions"
                priority
                widths={[640, 1024, 1440, 1920]}
                sizes="100vw"
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black-950 via-black-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="md:w-2/3 lg:w-1/2">
                <span className="text-gold-500 uppercase tracking-[0.2em] font-bold text-sm mb-4 block animate-fade-in pl-1">
                    Experts in Ladies &amp; Kids Wear
                </span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                    <span className="block text-gold-500">Exquisite</span>
                    Designs For You
                </h1>
                <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
                    From bridal lehengas to everyday elegance, we bring the boutique experience to your home. Specialized tailoring for Ladies and Kids.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/book-appointment" className="btn-gold">Book An Appointment</Link>
                    <a href={site.phoneHref} className="btn-outline-gold">Call: {site.phone.replace('+91 ', '')}</a>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
