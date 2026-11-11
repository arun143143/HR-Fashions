import { imageSrcSet, imageUrl } from '../../lib/images';

const DEFAULT_WIDTHS = [480, 768, 1024, 1440, 1920];

/**
 * Fast image: right-sized srcset, lazy by default, async decoding, reserved space.
 * Use priority only for the one image visible on first paint (the hero).
 */
const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    widths = DEFAULT_WIDTHS,
    sizes = '100vw',
    priority = false,
    className = '',
    ...rest
}) => {
    const srcSet = imageSrcSet(src, widths);
    const fallbackWidth = widths[Math.min(2, widths.length - 1)];

    return (
        <img
            src={imageUrl(src, fallbackWidth)}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            {...(priority ? { fetchpriority: 'high' } : {})}
            className={className}
            {...rest}
        />
    );
};

export default OptimizedImage;
