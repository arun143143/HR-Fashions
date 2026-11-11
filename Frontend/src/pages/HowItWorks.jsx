import { Link } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { steps } from '../data/process';
import { whatsappHref } from '../data/site';

const HowItWorks = () => {
    useDocumentMeta('How it works', 'How stitching with HR Fashions works: choose a design, book a visit, get measured, try it on, and collect it on the agreed date.');
    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro title="How it works" lead="From first message to finished outfit in five steps." />
            <div className="container mx-auto px-6">
                <div className="relative max-w-3xl">
                    <div className="stitch-vertical absolute left-0 inset-y-0" aria-hidden="true" />
                    <ol className="space-y-12 pl-10 md:pl-14">
                        {steps.map((step, i) => (
                            <li key={step.title}>
                                <span className="block font-serif text-5xl text-gold-500 leading-none mb-4" aria-hidden="true">{i + 1}</span>
                                <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">{step.title}</h2>
                                <p className="text-lg text-black-300 leading-relaxed">{step.desc}</p>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-16">
                    <Link to="/book-appointment" className="btn-gold">Book an appointment</Link>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">Message us on WhatsApp</a>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
