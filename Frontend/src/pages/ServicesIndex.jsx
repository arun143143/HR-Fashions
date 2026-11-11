import { Link } from 'react-router-dom';
import SectionTitle from '../components/ui/SectionTitle';
import OptimizedImage from '../components/ui/OptimizedImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { serviceList } from '../data/services';

const ServicesIndex = () => {
    useDocumentMeta('Our Services', 'Ladies and kids tailoring in Chennai: blouses, lehengas, anarkalis, kurtis, suits and frocks.');
    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <SectionTitle title="Our Services" subtitle="Choose a garment to see styles, prices and how we stitch it." centered />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {serviceList.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="group block bg-black-900 border border-white/10 hover:border-gold-500/60 transition-colors">
                        <div className="aspect-[4/3] overflow-hidden">
                            <OptimizedImage
                                src={s.heroImg}
                                alt={s.name}
                                width={640}
                                height={480}
                                widths={[320, 480, 640, 960]}
                                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="font-serif text-xl text-white group-hover:text-gold-500 transition-colors">{s.name}</h2>
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{s.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ServicesIndex;
