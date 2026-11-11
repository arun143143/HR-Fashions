import SectionTitle from '../components/ui/SectionTitle';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { Link } from 'react-router-dom';

import { steps } from '../data/process';

const HowItWorks = () => {
    useDocumentMeta('How It Works', 'How HR Fashions tailoring works, from choosing a design to delivery.');
    return (
    <div className="pt-32 pb-20 container mx-auto px-6">
        <SectionTitle title="How It Works" subtitle="From first message to finished outfit in five simple steps." centered />
        <div className="grid gap-8 md:grid-cols-5 mt-12">
            {steps.map((s, i) => (
                <div key={s.title} className="text-center">
                    <div className="font-serif text-4xl text-gold-500 mb-3">{i + 1}</div>
                    <h3 className="font-serif text-lg text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
            ))}
        </div>
        <div className="text-center mt-16">
            <Link to="/book-appointment" className="btn-gold">Book An Appointment</Link>
        </div>
    </div>
    );
};

export default HowItWorks;
