import { Link } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import useDocumentMeta from '../hooks/useDocumentMeta';

const NotFound = () => {
    useDocumentMeta('Page not found');
    return (
        <div className="bg-black-950 pb-24">
            <PageIntro title="We could not find that page" lead="The link may be old or mistyped. Start again from the home page or look through our services.">
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <Link to="/" className="btn-gold">Go to the home page</Link>
                    <Link to="/services" className="btn-outline-gold">See all services</Link>
                </div>
            </PageIntro>
        </div>
    );
};

export default NotFound;
