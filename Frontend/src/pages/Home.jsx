import { Link } from 'react-router-dom';
import { Scissors, Ruler, Home as HomeIcon, CalendarCheck } from 'lucide-react';
import Hero from '../components/ui/Hero';
import OptimizedImage from '../components/ui/OptimizedImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { serviceList } from '../data/services';
import { steps } from '../data/process';
import { generalFaqs } from '../data/faqs';
import { whatsappHref } from '../data/site';

// TODO before launch: the owner confirms each of these is true for HR Fashions.
const reasons = [
    { icon: Scissors, title: 'Only women and girls', desc: 'Blouses, bridal lehengas and kids’ frocks are all we stitch.' },
    { icon: HomeIcon, title: 'Measured at your home', desc: 'We come to you for measurements, so there is no trip to a shop.' },
    { icon: Ruler, title: 'Fitted, then adjusted', desc: 'You try the outfit on and we adjust it until it sits right.' },
    { icon: CalendarCheck, title: 'A date agreed up front', desc: 'We agree the delivery date when you book, before stitching starts.' },
];

const Home = () => {
    useDocumentMeta('', 'HR Fashions: bespoke ladies and kids tailoring in Chennai. Blouses, lehengas, anarkalis, kurtis, suits and frocks, with home measurement and delivery.');

    return (
        <div className="bg-black-950">
            <Hero />

            <section className="container mx-auto px-6 py-20 md:py-28" aria-labelledby="home-services">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                    <h2 id="home-services" className="section-heading">What we stitch</h2>
                    <Link to="/services" className="text-gold-300 font-bold underline underline-offset-4 hover:text-white transition-colors">
                        See all services
                    </Link>
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
                    {serviceList.map((service) => (
                        <li key={service.slug}>
                            <Link to={`/services/${service.slug}`} className="group block">
                                <div className="aspect-[3/4] overflow-hidden rounded-t-full bg-black-900 kolam border border-gold-500/40 transition-colors duration-200 group-hover:border-gold-300">
                                    <OptimizedImage
                                        src={service.heroImg}
                                        alt=""
                                        width={300}
                                        height={400}
                                        widths={[240, 360, 480, 720]}
                                        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 45vw"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="mt-4 font-serif text-lg leading-snug text-white transition-colors duration-200 group-hover:text-gold-300">
                                    {service.name}
                                </h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-black-900 kolam" aria-labelledby="home-steps">
                <div className="container mx-auto px-6 py-20 md:py-28">
                    <h2 id="home-steps" className="section-heading mb-12 md:mb-16">From first message to finished outfit</h2>
                    <div className="relative">
                        <div className="stitch hidden md:block absolute top-0 inset-x-0" aria-hidden="true" />
                        <div className="stitch-vertical md:hidden absolute left-0 inset-y-0" aria-hidden="true" />
                        <ol className="grid gap-10 md:grid-cols-5 md:gap-8 pl-8 md:pl-0 md:pt-10">
                            {steps.map((step, i) => (
                                <li key={step.title}>
                                    <span className="block font-serif text-4xl text-gold-500 leading-none mb-3" aria-hidden="true">{i + 1}</span>
                                    <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
                                    <p className="text-black-300 leading-relaxed">{step.desc}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-12" aria-labelledby="home-why">
                <div className="lg:col-span-5">
                    <h2 id="home-why" className="section-heading">Why families come back to HR Fashions</h2>
                </div>
                <ul className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
                    {reasons.map((reason) => (
                        <li key={reason.title} className="flex gap-5 py-6">
                            <reason.icon size={26} strokeWidth={1.5} className="text-gold-500 shrink-0 mt-1" aria-hidden="true" />
                            <div>
                                <h3 className="font-serif text-xl text-white mb-1">{reason.title}</h3>
                                <p className="text-black-300 leading-relaxed">{reason.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-black-900" aria-labelledby="home-faq">
                <div className="container mx-auto px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <h2 id="home-faq" className="section-heading">Questions before you book</h2>
                    </div>
                    <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
                        {generalFaqs.map((faq) => (
                            <details key={faq.question} className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl text-white hover:text-gold-300 [&::-webkit-details-marker]:hidden">
                                    {faq.question}
                                    <span className="relative h-4 w-4 shrink-0 text-gold-500" aria-hidden="true">
                                        <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
                                        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
                                    </span>
                                </summary>
                                <p className="pb-6 pr-10 text-black-200 leading-relaxed max-w-prose">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-20 md:py-28" aria-labelledby="home-book">
                <div className="p-[7px]">
                    <div className="zari-frame px-6 py-14 md:px-16 md:py-20 text-center">
                        <h2 id="home-book" className="section-heading max-w-2xl mx-auto">Tell us what you want stitched</h2>
                        <p className="text-lg text-black-200 leading-relaxed max-w-xl mx-auto mt-5">
                            Send a request and we confirm a time with you on WhatsApp.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                            <Link to="/book-appointment" className="btn-gold">Book an appointment</Link>
                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                                Message us on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
