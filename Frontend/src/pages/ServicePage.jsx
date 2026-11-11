import { Link, useParams } from 'react-router-dom';
import { Ruler, Scissors, Truck, ShieldCheck, Check } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { getService } from '../data/services';
import { site } from '../data/site';
import NotFound from './NotFound';

const ServicePage = () => {
    const { slug } = useParams();
    const data = getService(slug);

    useDocumentMeta(data?.title, data?.description?.split('\n')[0].slice(0, 155));

    if (!data) return <NotFound />;

    return (
        <div className="bg-black-950 min-h-screen pb-20">
            {/* Service Hero */}
            <div className="relative h-[60vh] flex items-center justify-center">
                <OptimizedImage src={data.heroImg} alt={data.title} priority widths={[640, 1024, 1440, 1920]} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-transparent to-black-950/80"></div>

                <div className="relative z-10 text-center px-6">
                    <span className="text-gold-500 uppercase tracking-widest text-sm font-bold mb-4 block">Premium Tailoring Service</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{data.title}</h1>
                    <Link to="/book-appointment" className="btn-gold">Book Consultation</Link>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                            <h2 className="text-2xl font-serif font-bold text-white mb-4">Service Overview</h2>
                            <p className="text-gray-300 leading-relaxed text-lg mb-6 whitespace-pre-line">
                                {data.description}
                            </p>

                            <h3 className="text-xl font-serif font-bold text-gold-500 mb-4">Why Choose Us?</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                                            <Check size={16} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Extended Content for Lehenga (or others if added) */}
                        {data.types && (
                            <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                                <h2 className="text-2xl font-serif font-bold text-white mb-6">Types of Styles We Craft</h2>
                                <div className="space-y-6">
                                    {data.types.map((type, idx) => (
                                        <div key={idx} className="border-b border-white/5 pb-4 last:border-0">
                                            <h4 className="text-lg font-bold text-gold-500 mb-2">{type.name}</h4>
                                            <p className="text-gray-400 text-sm">{type.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.tips && (
                            <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                                <h2 className="text-2xl font-serif font-bold text-white mb-6">Tips to Look Your Best</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.tips.map((tip, idx) => (
                                        <div key={idx} className="bg-black-950 p-4 border border-white/5">
                                            <span className="text-gold-500 font-bold text-xl mb-2 block">0{idx + 1}</span>
                                            <h4 className="font-bold text-white mb-2">{tip.title}</h4>
                                            <p className="text-gray-400 text-sm">{tip.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Process Section */}
                        <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                            <h2 className="text-2xl font-serif font-bold text-white mb-8">Our Handling Process</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: Ruler, title: 'Measurement', desc: 'Expert masterji visits your home for precise formatting.' },
                                    { icon: Scissors, title: 'Stitching', desc: 'Crafted in our sanitized workshop by specialists.' },
                                    { icon: Truck, title: 'Delivery', desc: 'Steam-pressed and delivered in premium packaging.' }
                                ].map((step, idx) => (
                                    <div key={idx} className="text-center p-6 bg-black-950 border border-white/5 hover:border-gold-500/50 transition-colors">
                                        <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gold-500 mb-4">
                                            <step.icon size={24} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-sm text-gray-400">{step.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex items-center gap-4 bg-gold-500/10 p-4 border border-gold-500/20">
                                <ShieldCheck className="text-gold-500 shrink-0" size={32} />
                                <div>
                                    <h5 className="text-white font-bold">Hygiene & Safety Guaranteed</h5>
                                    <p className="text-sm text-gray-400">All garments are sanitized and steam ironed before delivery.</p>
                                </div>
                            </div>
                        </div>

                        {data.faqs && (
                            <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                                <h2 className="text-2xl font-serif font-bold text-white mb-6">Frequently Asked Questions</h2>
                                <ul className="space-y-4">
                                    {data.faqs.map((faq, idx) => (
                                        <li key={idx} className="bg-black-950 p-4 border border-white/5 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                                            <span className="text-gray-300 font-medium">{faq}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                    {/* Sidebar / Pricing */}
                    <div className="space-y-6">
                        <div className="bg-black-900 border border-gold-500/30 text-white p-8 sticky top-24">
                            <h3 className="text-2xl font-serif font-bold mb-6 border-b-2 border-gold-500 inline-block pb-1">Price List</h3>
                            <div className="space-y-4 mb-8">
                                {data.pricing.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 hover:bg-white/5 p-2 transition-colors">
                                        <span className="font-medium text-gray-300">{item.type}</span>
                                        <span className="font-bold text-gold-500">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/book-appointment" className="btn-gold w-full text-center py-4 text-base">
                                Book Now
                            </Link>
                            <p className="text-center text-xs text-gray-400 mt-4">{site.deliveryNote}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
