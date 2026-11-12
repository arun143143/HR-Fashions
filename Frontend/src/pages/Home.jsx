import { Link } from 'react-router-dom';
import { Needle, TapeMeasure, DressForm, CalendarStitch } from '../components/ui/Icons';
import Hero from '../components/ui/Hero';
import ScrollScene from '../components/ui/ScrollScene';
import TailorChennai from '../components/ui/TailorChennai';
import OptimizedImage from '../components/ui/OptimizedImage';
import FaqList from '../components/ui/FaqList';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { serviceList } from '../data/services';
import { steps } from '../data/process';
import { generalFaqs } from '../data/faqs';
import { whatsappHref } from '../data/site';

// What a customer can count on. Each answers a worry from docs/marketing.md (fit, date, trust).
// TODO before launch: the owner confirms each of these is true for HR Fashions, especially home measurement.
const reasons = [
    { icon: Needle, title: 'We stitch only for women and girls', desc: 'Blouses, lehengas, anarkalis, kurtis, pant suits and girls’ wear. Nothing else on our table.' },
    { icon: TapeMeasure, title: 'Measured at your home', desc: 'We come to you with the tape, so you do not have to bring the whole family to a shop.' },
    { icon: DressForm, title: 'Fitted on you before it is finished', desc: 'You try it on half-way. We adjust it until it sits right, then finish the seams.' },
    { icon: CalendarStitch, title: 'The date is agreed before we cut', desc: 'You know when it will be ready before stitching starts. If anything changes, we tell you first.' },
];

const Home = () => {
    useDocumentMeta('', 'HR Fashions is a tailor for women and girls in Vadapalani, Chennai. Blouses, lehengas, anarkalis, kurtis, pant suits and girls’ wear, measured, stitched and fitted on you.');

    return (
        <div className="bg-black-950">
            <Hero />

            <section className="container mx-auto px-6 py-20 md:py-28" aria-labelledby="home-services">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                    <h2 id="home-services" className="section-heading">What we stitch</h2>
                    <Link to="/services" className="text-gold-300 font-bold link-stitch hover:text-white">
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

            <ScrollScene />

            <TailorChennai />

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
                    <h2 id="home-why" className="section-heading">What you can count on</h2>
                </div>
                <ul className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
                    {reasons.map((reason) => (
                        <li key={reason.title} className="flex gap-5 py-6">
                            <reason.icon size={30} className="text-gold-500 shrink-0" />
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
                    <FaqList faqs={generalFaqs} className="lg:col-span-7" />
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
