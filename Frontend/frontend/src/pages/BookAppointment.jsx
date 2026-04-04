import SectionTitle from '../components/ui/SectionTitle';

const BookAppointment = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <SectionTitle title="Book Your Appointment" subtitle="Schedule a visit from our expert tailor at your convenience." />
            <div className="bg-black-900 border border-white/10 p-8 max-w-2xl mx-auto">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input type="text" className="w-full bg-black-950 border border-white/10 text-white p-3 focus:border-gold-500 outline-none transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Service Type</label>
                        <select className="w-full bg-black-950 border border-white/10 text-white p-3 focus:border-gold-500 outline-none transition-colors">
                            <option>Ladies Tailoring</option>
                            <option>Kids Tailoring</option>
                            <option>Bridal Wear</option>
                            <option>Alteration</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Date</label>
                        <input type="date" className="w-full bg-black-950 border border-white/10 text-white p-3 focus:border-gold-500 outline-none transition-colors" />
                    </div>
                    <button type="submit" className="btn-gold w-full mt-4">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
