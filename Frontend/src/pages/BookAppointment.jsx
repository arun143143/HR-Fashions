import { useState } from 'react';
import PageIntro from '../components/ui/PageIntro';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { site } from '../data/site';
import { serviceList } from '../data/services';

const SERVICE_OPTIONS = [...serviceList.map((s) => s.name), 'Alteration', 'Other'];

const NEXT_STEPS = [
    'WhatsApp opens with your request filled in. Send it to us.',
    'We reply to confirm the date and time.',
    'We take your measurements and finalise the style with you.',
];

const todayIso = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
};

const inputClass =
    'w-full bg-black-950 border border-white/25 text-white px-4 py-3.5 transition-colors hover:border-white/50 focus:border-gold-300';
const labelClass = 'block font-bold text-white mb-2';

// Until bookings are saved in Supabase, the form opens WhatsApp with the details filled in.
const BookAppointment = () => {
    useDocumentMeta('Book an appointment', 'Send HR Fashions a stitching request. It opens in WhatsApp, and we confirm a time for measurements with you there.');
    const [form, setForm] = useState({ name: '', phone: '', service: SERVICE_OPTIONS[0], date: '' });

    const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = [
            `Hello ${site.name}, I would like to book an appointment.`,
            `Name: ${form.name.trim()}`,
            `Phone: ${form.phone.trim()}`,
            `Service: ${form.service}`,
            `Preferred date: ${form.date}`,
        ].join('\n');
        const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro title="Book an appointment" lead="Tell us what you want stitched and when. Your request opens in WhatsApp, and we confirm the time there." />
            <div className="container mx-auto px-6 grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 p-[7px]">
            <div className="zari-frame bg-black-900 p-6 md:p-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="booking-name" className={labelClass}>Full name</label>
                        <input id="booking-name" type="text" required autoComplete="name" value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="booking-phone" className={labelClass}>Phone number</label>
                        <input id="booking-phone" type="tel" required autoComplete="tel" pattern="[0-9+\s-]{10,15}" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                        <label htmlFor="booking-service" className={labelClass}>What do you want stitched?</label>
                        <select id="booking-service" value={form.service} onChange={update('service')} className={inputClass}>
                            {SERVICE_OPTIONS.map((name) => (
                                <option key={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="booking-date" className={labelClass}>Preferred date</label>
                        <input id="booking-date" type="date" required min={todayIso()} value={form.date} onChange={update('date')} className={inputClass} />
                    </div>
                    <button type="submit" className="btn-gold w-full mt-4">Send request on WhatsApp</button>
                </form>
            </div>
            </div>
            <aside className="lg:col-span-5" aria-labelledby="booking-next">
                <h2 id="booking-next" className="font-serif font-semibold text-white text-2xl md:text-3xl mb-6">What happens next</h2>
                <ol className="divide-y divide-white/10 border-y border-white/10">
                    {NEXT_STEPS.map((text, i) => (
                        <li key={text} className="flex gap-5 py-5">
                            <span className="font-serif text-3xl leading-none text-gold-500" aria-hidden="true">{i + 1}</span>
                            <span className="text-black-200 leading-relaxed">{text}</span>
                        </li>
                    ))}
                </ol>
            </aside>
            </div>
        </div>
    );
};

export default BookAppointment;
