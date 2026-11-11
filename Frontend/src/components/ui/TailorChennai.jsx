import { Link } from 'react-router-dom';
import { serviceList } from '../../data/services';

// Plain-language text about the shop and what it stitches, so search engines and new visitors
// understand who HR Fashions is for. Written for HR Fashions; nothing here is copied from other sites.
// TODO before launch: the owner confirms every claim in this section.
const TailorChennai = () => (
    <section className="container mx-auto px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-12 lg:gap-16" aria-labelledby="home-tailor">
        <div className="lg:col-span-5">
            <h2 id="home-tailor" className="section-heading">A tailor for women and girls in Vadapalani</h2>
            <div className="stitch max-w-[10rem] mt-7" aria-hidden="true" />
        </div>

        <div className="lg:col-span-7 space-y-6 text-lg text-black-200 leading-relaxed max-w-prose">
            <p>
                Every outfit we make starts the same way: you, a mirror and a tape measure. HR Fashions stitches only
                for women and girls, so our days go into the cuts that matter to you: princess and katori blouses,
                kali lehengas, floor-length anarkalis, and pattu pavadai with room to grow.
            </p>
            <p>
                Bring the silk saree from your mother&rsquo;s cupboard, the lehenga set for your sister&rsquo;s
                wedding, or a length of cotton for everyday kurtis. Tell us what you have in mind, or choose a style
                from our gallery. We measure, agree the price and the date with you, and only then cut.
            </p>
            <p>
                Half-way through, you try it on. We adjust it until it sits right, then finish the seams. Book online
                or message us on WhatsApp, and we will fix a time.
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
