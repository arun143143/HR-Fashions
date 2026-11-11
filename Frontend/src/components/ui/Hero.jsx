import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { site, whatsappHref } from '../../data/site';

const Hero = () => (
    <section className="bg-black-950 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
                <h1 className="font-serif font-semibold text-white leading-[1.05] tracking-tight text-[clamp(2.6rem,7vw,5.25rem)]">
                    Clothes stitched to&nbsp;your measure.
                </h1>
                <div className="stitch stitch-draw max-w-md my-8" aria-hidden="true" />
                <p className="text-lg md:text-xl text-black-200 leading-relaxed max-w-xl">
                    Blouses, lehengas, anarkalis, kurtis and kids&rsquo; frocks, tailored in Chennai for women and girls.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <Link to="/book-appointment" className="btn-gold">Book an appointment</Link>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                        Message us on WhatsApp
                    </a>
                </div>
            </div>

            <div className="lg:col-span-5 p-[7px]">
                <figure className="zari-frame bg-black-900 kolam">
                    <OptimizedImage
                        src={site.heroImage}
                        alt="A finished outfit tailored by HR Fashions"
                        priority
                        width={800}
                        height={1000}
                        widths={[640, 1024, 1440, 1920]}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="block w-full aspect-[4/5] object-cover"
                    />
                    <div className="zari-band" aria-hidden="true" />
                </figure>
            </div>
        </div>
    </section>
);

export default Hero;
