import { useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { site } from '../data/site';
import { serviceList } from '../data/services';

const SERVICE_OPTIONS = [...serviceList.map((s) => s.name), 'Alteration', 'Other'];

const todayIso = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
};

const inputClass =
    'w-full bg-black-950 border border-white/10 text-white p-3 focus:border-gold-500 outline-none transition-colors';
const labelClass = 'block text-sm font-medium text-gray-400 mb-1';

// Until bookings are saved in Supabase, the form opens WhatsApp with the details filled in.
const BookAppointment = () => {
    useDocumentMeta('Book an Appointment', 'Book a tailoring appointment with HR Fashions in Chennai.');
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
        <div className="pt-32 pb-20 container mx-auto px-6">
            <SectionTitle title="Book Your Appointment" subtitle="Schedule a visit from our expert tailor at your convenience." />
            <div className="bg-black-900 border border-white/10 p-8 max-w-2xl mx-auto">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="booking-name" className={labelClass}>Full Name</label>
                        <input id="booking-name" type="text" required autoComplete="name" value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="booking-phone" className={labelClass}>Phone Number</label>
                        <input id="booking-phone" type="tel" required autoComplete="tel" pattern="[0-9+\s-]{10,15}" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                        <label htmlFor="booking-service" className={labelClass}>Service Type</label>
                        <select id="booking-service" value={form.service} onChange={update('service')} className={inputClass}>
                            {SERVICE_OPTIONS.map((name) => (
                                <option key={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="booking-date" className={labelClass}>Preferred Date</label>
                        <input id="booking-date" type="date" required min={todayIso()} value={form.date} onChange={update('date')} className={inputClass} />
                    </div>
                    <button type="submit" className="btn-gold w-full mt-4">Confirm Booking on WhatsApp</button>
                    <p className="text-xs text-gray-500 text-center">We confirm the time with you on WhatsApp.</p>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
