// The top of every inner page: title, the stitch rule, and one lead sentence.
const PageIntro = ({ title, lead, children }) => (
    <header className="container mx-auto px-6 pt-32 pb-12 md:pt-44 md:pb-16">
        <h1 className="font-serif font-semibold text-white leading-[1.08] tracking-tight text-[clamp(2.25rem,5.5vw,4rem)] max-w-3xl">
            {title}
        </h1>
        <div className="stitch max-w-xs my-7" aria-hidden="true" />
        {lead && <p className="text-lg md:text-xl text-black-200 leading-relaxed max-w-2xl">{lead}</p>}
        {children}
    </header>
);

export default PageIntro;
