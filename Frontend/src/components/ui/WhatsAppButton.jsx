import { Chat } from './Icons';
import { whatsappHref } from '../../data/site';

// Floating chat button shown on every page. The only place the WhatsApp green is used.
const WhatsAppButton = () => (
    <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/50 transition-transform duration-200 hover:scale-105"
    >
        <Chat size={28} />
    </a>
);

export default WhatsAppButton;
