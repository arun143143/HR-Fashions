import { Link } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import OptimizedImage from '../components/ui/OptimizedImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { serviceList } from '../data/services';

const ServicesIndex = () => {
    useDocumentMeta('Our Services', 'Ladies and kids tailoring in Chennai: blouses, lehengas, anarkalis, kurtis, suits and frocks.');
    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro title="What we stitch" lead="Choose a garment to see the styles, starting prices and what is included." />
            <ul className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {serviceList.map((s) => (
                    <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="group block">
                            <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-black-900 kolam border border-gold-500/40 transition-colors duration-200 group-hover:border-gold-300">
                                <OptimizedImage
                                    src={s.heroImg}
                                    alt=""
                                    width={640}
                                    height={800}
                                    widths={[320, 480, 640, 960]}
                                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="mt-5 font-serif text-2xl text-white transition-colors duration-200 group-hover:text-gold-300">{s.name}</h2>
                            <p className="mt-2 text-black-300 leading-relaxed line-clamp-2">{s.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesIndex;
