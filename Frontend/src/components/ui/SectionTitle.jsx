const SectionTitle = ({ title, subtitle, centered = false }) => {
    return (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className={`text-lg text-gray-400 max-w-3xl ${centered ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
