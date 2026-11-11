import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from '../components/ui/Icons';
import PageIntro from '../components/ui/PageIntro';
import OptimizedImage from '../components/ui/OptimizedImage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { designList, designCategories } from '../data/designs';

const ALL = 'All';
const filters = [ALL, ...designCategories];

const filterClass = (active) =>
    `px-4 py-2 border font-bold transition-colors duration-200 ${active ? 'bg-gold-500 border-gold-500 text-black-950' : 'border-white/20 text-white hover:border-gold-300 hover:text-gold-300'}`;

const lightboxButton =
    'flex h-11 w-11 items-center justify-center border border-gold-500 bg-black-950 text-gold-300 transition-colors hover:bg-gold-500 hover:text-black-950';

const Gallery = () => {
    useDocumentMeta('Gallery', 'Blouses, lehengas, anarkalis, kurtis and kids wear stitched by HR Fashions in Chennai.');

    const [category, setCategory] = useState(ALL);
    const [openIndex, setOpenIndex] = useState(null);
    const dialogRef = useRef(null);

    const visible = category === ALL ? designList : designList.filter((d) => d.category === category);
    const open = openIndex === null ? null : visible[openIndex];

    // The native dialog traps focus, closes on Escape and returns focus to the photo that opened it.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    const step = (by) => setOpenIndex((i) => (i + by + visible.length) % visible.length);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
    };

    const chooseCategory = (name) => {
        setOpenIndex(null);
        setCategory(name);
    };

    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro title="Work from our table" lead="Choose a garment type to see what we have stitched. Select a photo to see it larger." />

            <div className="container mx-auto px-6">
                <div className="flex flex-wrap gap-3 mb-10" role="group" aria-label="Filter by garment">
                    {filters.map((name) => (
                        <button key={name} type="button" aria-pressed={category === name} onClick={() => chooseCategory(name)} className={filterClass(category === name)}>
                            {name}
                        </button>
                    ))}
                </div>

                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
                    {visible.map((design, i) => (
                        <li key={design.image}>
                            <button type="button" onClick={() => setOpenIndex(i)} className="group block w-full text-left">
                                <div className="aspect-[3/4] overflow-hidden bg-black-900 kolam border border-gold-500/40 transition-colors duration-200 group-hover:border-gold-300">
                                    <OptimizedImage
                                        src={design.image}
                                        alt={design.title}
                                        width={480}
                                        height={640}
                                        widths={[240, 360, 480, 720]}
                                        sizes="(min-width: 1024px) 23vw, (min-width: 768px) 31vw, 46vw"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="block mt-3 font-serif text-lg leading-snug text-white transition-colors group-hover:text-gold-300">{design.title}</span>
                                <span className="block text-sm text-black-300">{design.category}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <dialog
                ref={dialogRef}
                onClose={() => setOpenIndex(null)}
                onKeyDown={onKeyDown}
                onClick={(e) => e.target === e.currentTarget && setOpenIndex(null)}
                aria-label={open ? open.title : 'Photo'}
                className="w-full max-w-[min(92vw,640px)] bg-transparent p-0 text-white backdrop:bg-black-950/90"
            >
                {open && (
                    <figure className="bg-black-950 border border-gold-500">
                        <OptimizedImage
                            src={open.image}
                            alt={open.title}
                            width={960}
                            height={1280}
                            widths={[480, 720, 960, 1440]}
                            sizes="(min-width: 700px) 640px, 92vw"
                            className="block w-full max-h-[70vh] object-contain bg-black-900"
                        />
                        <figcaption className="flex items-center justify-between gap-4 p-4">
                            <div>
                                <p className="font-serif text-lg leading-snug">{open.title}</p>
                                <p className="text-sm text-black-300">{open.category}, photo {openIndex + 1} of {visible.length}</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={lightboxButton}><ChevronLeft size={20} /></button>
                                <button type="button" onClick={() => step(1)} aria-label="Next photo" className={lightboxButton}><ChevronRight size={20} /></button>
                                <button type="button" onClick={() => setOpenIndex(null)} aria-label="Close photo" className={lightboxButton}><X size={20} /></button>
                            </div>
                        </figcaption>
                    </figure>
                )}
            </dialog>
        </div>
    );
};

export default Gallery;
