import { Link } from 'react-router-dom';
import useDocumentMeta from '../hooks/useDocumentMeta';

const NotFound = () => {
    useDocumentMeta('Page not found');
    return (
        <div className="pt-40 pb-24 container mx-auto px-6 text-center">
            <p className="text-gold-500 font-bold tracking-widest mb-4">404</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-6">We could not find that page</h1>
            <p className="text-gray-400 mb-10">The link may be old or mistyped.</p>
            <Link to="/" className="btn-gold">Back to home</Link>
        </div>
    );
};

export default NotFound;
