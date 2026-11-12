import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from './OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const SCENE_IMAGE = 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=2000';

/**
 * Scroll-driven scene. As the section rolls into view the photo grows from small and blurred to
 * full-screen and sharp, then the section locks to the screen while the words fade in.
 * Everything is tied to the scroll position. With reduced motion on, it is a plain static section.
 */
const ScrollScene = () => {
    const root = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add(
            '(prefers-reduced-motion: no-preference)',
            () => {
                gsap.fromTo(
                    '[data-scene-image]',
                    { scale: 0.68, filter: 'blur(14px)' },
                    {
                        scale: 1,
                        filter: 'blur(0px)',
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: 0.5 },
                    },
                );

                gsap.timeline({
                    scrollTrigger: { trigger: root.current, start: 'top top', end: '+=110%', scrub: 0.5, pin: true, anticipatePin: 1 },
                })
                    .fromTo('[data-scene-shade]', { opacity: 0 }, { opacity: 1, duration: 0.4 })
                    .fromTo('[data-scene-text] > *', { opacity: 0, y: 32 }, { opacity: 1, y: 0, stagger: 0.18, duration: 0.5 }, 0.15)
                    .to({}, { duration: 0.5 });
            },
            root,
        );
        return () => mm.revert();
    }, []);

    return (
        <section ref={root} className="relative h-[100svh] overflow-hidden bg-black-950" aria-labelledby="scene-heading">
            <div data-scene-image className="absolute inset-0 will-change-transform">
                <OptimizedImage
                    src={SCENE_IMAGE}
                    alt="A floor-length gown in motion"
                    width={2000}
                    height={1333}
                    widths={[640, 1024, 1440, 1920]}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                    onLoad={() => ScrollTrigger.refresh()}
                />
            </div>
            <div data-scene-shade className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/65 to-black-950/20" aria-hidden="true" />
            <div data-scene-text className="container relative mx-auto flex h-full flex-col justify-end px-6 pb-16 md:pb-24">
                <h2 id="scene-heading" className="font-serif font-semibold text-white leading-[1.08] tracking-tight text-[clamp(2.25rem,6vw,4.5rem)] max-w-3xl">
                    Every outfit starts with a tape measure.
                </h2>
                <p className="mt-6 text-lg md:text-xl text-black-100 leading-relaxed max-w-xl">
                    We take your measurements, cut the fabric to those numbers, and fit the outfit on you before it is finished.
                </p>
                <div className="mt-9">
                    <Link to="/how-it-works" className="btn-gold">See how it works</Link>
                </div>
            </div>
        </section>
    );
};

export default ScrollScene;
