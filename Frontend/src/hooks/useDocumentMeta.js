import { useEffect } from 'react';
import { site } from '../data/site';

// Sets the page title and meta description for each page.
export default function useDocumentMeta(title, description) {
    useEffect(() => {
        document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
        if (description) {
            let tag = document.querySelector('meta[name="description"]');
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('name', 'description');
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', description);
        }
    }, [title, description]);
}
