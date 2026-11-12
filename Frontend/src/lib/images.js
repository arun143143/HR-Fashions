// Image helpers. Unsplash photos are resized by their CDN through URL parameters.
// Photos you upload yourself should already be resized WebP files (the admin panel does this before upload).
const RESIZABLE_HOSTS = ['images.unsplash.com'];

const parse = (src) => {
    try {
        return new URL(src);
    } catch {
        return null;
    }
};

export const isResizable = (src) => {
    const url = src && parse(src);
    return Boolean(url && RESIZABLE_HOSTS.includes(url.hostname));
};

export const imageUrl = (src, width, quality = 75) => {
    if (!isResizable(src)) return src;
    const url = parse(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality));
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    return url.toString();
};

export const imageSrcSet = (src, widths) =>
    isResizable(src) ? widths.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ') : undefined;
