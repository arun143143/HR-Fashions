import SectionTitle from '../components/ui/SectionTitle';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { Link } from 'react-router-dom';

const steps = [
    { n: '01', title: 'Choose your design', desc: 'Browse our designs or bring your own photo and fabric.' },
    { n: '02', title: 'Book a visit', desc: 'Send a request and we confirm the time on WhatsApp.' },
    { n: '03', title: 'Measurements and fabric', desc: 'We take measurements and finalise the style with you.' },
    { n: '04', title: 'Stitching and fitting', desc: 'Your outfit is stitched, then checked and adjusted for fit.' },
    { n: '05', title: 'Delivery', desc: 'Collect your outfit or have it delivered.' },
];

const HowItWorks = () => {
    useDocumentMeta('How It Works', 'How HR Fashions tailoring works, from choosing a design to delivery.');
    return (
    <div className="pt-32 pb-20 container mx-auto px-6">
        <SectionTitle title="How It Works" subtitle="From first message to finished outfit in five simple steps." centered />
        <div className="grid gap-8 md:grid-cols-5 mt-12">
            {steps.map((s) => (
                <div key={s.n} className="text-center">
                    <div className="font-serif text-4xl text-gold-500 mb-3">{s.n}</div>
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
