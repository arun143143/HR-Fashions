import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center bg-black-950 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2008&auto=format&fit=crop"
                    alt="Luxury Ladies Tailoring"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black-950 via-black-950/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 lg:w-1/2">
                    <span className="text-gold-500 uppercase tracking-[0.2em] font-bold text-sm mb-4 block animate-fade-in pl-1">
                        Experts in Ladies & Kids Wear
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        <span className="block text-gold-500">Exquisite</span>
                        Designs For You
                    </h1>
                    <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
                        From bridal lehengas to everyday elegance, we bring the boutique experience to your home. Specialized tailoring for Ladies and Kids.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/book-appointment" className="btn-gold">
                            Book An Appointment
                        </Link>
                        <a href="tel:+918826466345" className="btn-outline-gold">
                            Call: 882-646-6345
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
