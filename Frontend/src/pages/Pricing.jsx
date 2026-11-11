import { Link } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { serviceList } from '../data/services';

const Pricing = () => {
    useDocumentMeta('Prices', 'Starting prices for blouse, lehenga, anarkali, kurti, suit and kids wear stitching at HR Fashions, Chennai.');
    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro
                title="Starting prices"
                lead="Stitching prices for each garment. The final price is confirmed after we see your fabric and design."
            />
            <div className="container mx-auto px-6 grid gap-x-16 gap-y-14 md:grid-cols-2">
                {serviceList.map((s) => (
                    <section key={s.slug} aria-labelledby={`price-${s.slug}`}>
                        <div className="flex items-baseline justify-between gap-4 border-b border-gold-500 pb-3">
                            <h2 id={`price-${s.slug}`} className="font-serif font-semibold text-2xl md:text-3xl text-white">{s.name}</h2>
                            <Link to={`/services/${s.slug}`} className="shrink-0 text-gold-300 font-bold link-stitch hover:text-white">
                                See styles
                            </Link>
                        </div>
                        <dl>
                            {s.pricing.map((item) => (
                                <div key={item.type} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5">
                                    <dt className="text-black-200">{item.type}</dt>
                                    <dd className="font-serif text-xl text-gold-300 whitespace-nowrap">{item.price}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                ))}
            </div>
            <div className="container mx-auto px-6 mt-16">
                <Link to="/book-appointment" className="btn-gold">Book an appointment</Link>
            </div>
        </div>
    );
};

export default Pricing;
