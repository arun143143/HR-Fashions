import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { getService } from '../data/services';
import { site, whatsappHref } from '../data/site';
import NotFound from './NotFound';

const blockHeading = 'font-serif font-semibold text-white text-2xl md:text-3xl mb-6';

const ServicePage = () => {
    const { slug } = useParams();
    const data = getService(slug);

    useDocumentMeta(data?.title, data?.description?.split('\n')[0].slice(0, 155));

    if (!data) return <NotFound />;

    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <header className="container mx-auto px-6 pt-32 pb-16 md:pt-44 md:pb-20 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                    <h1 className="font-serif font-semibold text-white leading-[1.08] tracking-tight text-[clamp(2.25rem,5.5vw,4rem)]">
                        {data.title}
                    </h1>
                    <div className="stitch max-w-xs my-7" aria-hidden="true" />
                    <p className="text-lg text-black-200 leading-relaxed max-w-2xl whitespace-pre-line">{data.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <Link to="/book-appointment" className="btn-gold">Book an appointment</Link>
                        <a href="#prices" className="btn-outline-gold">See starting prices</a>
                    </div>
                </div>
                <div className="lg:col-span-5 p-[7px]">
                    <figure className="zari-frame bg-black-900 kolam">
                        <OptimizedImage
                            src={data.heroImg}
                            alt={data.name}
                            priority
                            width={800}
                            height={1000}
                            widths={[640, 1024, 1440, 1920]}
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="block w-full aspect-[4/5] object-cover"
                        />
                        <div className="zari-band" aria-hidden="true" />
                    </figure>
                </div>
            </header>

            <div className="container mx-auto px-6 grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7 space-y-16">
                    <section aria-labelledby="included">
                        <h2 id="included" className={blockHeading}>What is included</h2>
                        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                            {data.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-black-200">
                                    <Check size={20} className="text-gold-500 shrink-0 mt-0.5" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {data.types && (
                        <section aria-labelledby="styles">
                            <h2 id="styles" className={blockHeading}>Styles we stitch</h2>
                            <dl className="divide-y divide-white/10 border-y border-white/10">
                                {data.types.map((type) => (
                                    <div key={type.name} className="py-5">
                                        <dt className="font-serif text-xl text-white mb-1">{type.name}</dt>
                                        <dd className="text-black-300 leading-relaxed">{type.desc}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    )}

                    {data.tips && (
                        <section aria-labelledby="tips">
                            <h2 id="tips" className={blockHeading}>Before you choose</h2>
                            <dl className="grid gap-8 sm:grid-cols-2">
                                {data.tips.map((tip) => (
                                    <div key={tip.title} className="border-l border-gold-500 pl-5">
                                        <dt className="font-serif text-xl text-white mb-1">{tip.title}</dt>
                                        <dd className="text-black-300 leading-relaxed">{tip.desc}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    )}

                    {data.faqs && (
                        <section aria-labelledby="questions">
                            <h2 id="questions" className={blockHeading}>Questions customers ask</h2>
                            <ul className="divide-y divide-white/10 border-y border-white/10">
                                {data.faqs.map((faq) => (
                                    <li key={faq} className="py-4 text-black-200">{faq}</li>
                                ))}
                            </ul>
                            <p className="mt-5 text-black-300">
                                Have one of these questions?{' '}
                                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-gold-300 font-bold underline underline-offset-4 hover:text-white transition-colors">
                                    Ask us on WhatsApp
                                </a>
                            </p>
                        </section>
                    )}

                    <p className="text-black-300">
                        New to custom tailoring?{' '}
                        <Link to="/how-it-works" className="text-gold-300 font-bold underline underline-offset-4 hover:text-white transition-colors">
                            See how it works
                        </Link>
                    </p>
                </div>

                <aside id="prices" className="lg:col-span-5 scroll-mt-28" aria-labelledby="prices-heading">
                    <div className="lg:sticky lg:top-28 p-[7px]">
                        <div className="zari-frame bg-black-900 p-7 md:p-9">
                            <h2 id="prices-heading" className={blockHeading}>Starting prices</h2>
                            <dl>
                                {data.pricing.map((item) => (
                                    <div key={item.type} className="flex items-baseline justify-between gap-4 py-3.5 border-b border-white/10">
                                        <dt className="text-black-200">{item.type}</dt>
                                        <dd className="font-serif text-xl text-gold-300 whitespace-nowrap">{item.price}</dd>
                                    </div>
                                ))}
                            </dl>
                            <p className="mt-5 text-sm text-black-300 leading-relaxed">
                                The final price is confirmed after we see your fabric and design.
                            </p>
                            <Link to="/book-appointment" className="btn-gold w-full mt-6">Book an appointment</Link>
                            <p className="text-center text-sm text-black-300 mt-4">{site.deliveryNote}</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ServicePage;
