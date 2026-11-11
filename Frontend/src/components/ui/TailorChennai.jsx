import { Link } from 'react-router-dom';
import { serviceList } from '../../data/services';

// Plain-language text about the shop and what it stitches, so search engines and new visitors
// understand who HR Fashions is for. Written for HR Fashions; nothing here is copied from other sites.
// TODO before launch: the owner confirms every claim in this section.
const TailorChennai = () => (
    <section className="container mx-auto px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-12 lg:gap-16" aria-labelledby="home-tailor">
        <div className="lg:col-span-5">
            <h2 id="home-tailor" className="section-heading">A ladies and kids tailor in Chennai</h2>
            <div className="stitch max-w-[10rem] mt-7" aria-hidden="true" />
        </div>

        <div className="lg:col-span-7 space-y-6 text-lg text-black-200 leading-relaxed max-w-prose">
            <p>
                HR Fashions stitches clothes for women and girls, and nothing else. That focus means our tailors know
                the cuts that matter most to you: princess and katori blouses, flared lehengas, floor-length anarkalis
                and frocks with room for a child to grow.
            </p>
            <p>
                You can bring your own fabric and a photo of a design you like, or choose a style from our gallery.
                We take your measurements, agree the delivery date before we start, and fit the outfit on you before
                it is finished.
            </p>
            <p>
                Our shop is in Vadapalani. Book an appointment online or message us on WhatsApp, and we confirm the
                time with you there.
            </p>

            <nav aria-label="Tailoring services" className="pt-4">
                <h3 className="font-serif text-xl text-white mb-4">Choose what you want stitched</h3>
                <ul className="flex flex-wrap gap-3">
                    {serviceList.map((s) => (
                        <li key={s.slug}>
                            <Link
                                to={`/services/${s.slug}`}
                                className="inline-block border border-white/20 px-4 py-2 text-base font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
                            >
                                {s.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </section>
);

export default TailorChennai;
