import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { site, whatsappHref } from '../../data/site';

// Landing hero: the main image fills the screen edge to edge and the words sit on its dark side.
const Hero = () => (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black-950 lg:items-center">
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
            <OptimizedImage
                src={site.heroImage}
                alt="A customer wearing a silk saree and blouse tailored by HR Fashions"
                priority
                width={1600}
                height={2000}
                widths={[640, 1024, 1440, 1920]}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="h-full w-full object-cover object-[center_20%]"
            />
            <div
                className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/75 to-black-950/30 lg:bg-gradient-to-r lg:from-black-950 lg:via-black-950/45 lg:to-transparent"
                aria-hidden="true"
            />
        </div>

        <div className="container mx-auto px-6 pb-20 pt-40 lg:py-44">
            <div className="max-w-2xl">
                <h1 className="font-serif font-semibold text-white leading-[1.05] tracking-tight text-[clamp(2.6rem,7vw,5.25rem)]">
                    Clothes stitched to&nbsp;your measure.
                </h1>
                <div className="stitch stitch-draw max-w-md my-8" aria-hidden="true" />
                <p className="text-lg md:text-xl text-black-100 leading-relaxed max-w-xl">
                    A tailor for women and girls in Vadapalani, Chennai. Bring your fabric and the design you have in
                    mind. We measure you, cut to your numbers and fit it on you until it sits right.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <Link to="/book-appointment" className="btn-gold">Book an appointment</Link>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline-gold bg-black-950/60">
                        Message us on WhatsApp
                    </a>
                </div>
            </div>
        </div>

        <div className="zari-band absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
);

export default Hero;
