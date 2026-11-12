// Questions and answers that open one at a time. Native <details>, so it works with the keyboard and without JavaScript.
// faqs: [{ question, answer }]
const FaqList = ({ faqs, className = '' }) => (
    <div className={`divide-y divide-white/10 border-y border-white/10 ${className}`}>
        {faqs.map((faq) => (
            <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl text-white hover:text-gold-300 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="relative h-4 w-4 shrink-0 text-gold-500" aria-hidden="true">
                        <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
                        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
                    </span>
                </summary>
                <p className="pb-6 pr-10 text-black-200 leading-relaxed max-w-prose">{faq.answer}</p>
            </details>
        ))}
    </div>
);

export default FaqList;
