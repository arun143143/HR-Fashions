import { Link, useParams } from 'react-router-dom';
import { Ruler, Scissors, Truck, ShieldCheck, Check } from 'lucide-react';

const ServicePage = () => {
    const { category } = useParams();

    // Mock Data Store
    const serviceData = {
        'blouse-stitching': {
            title: 'Designer Blouse Stitching',
            heroImg: 'https://images.unsplash.com/photo-1629872430082-93d891271f4f?auto=format&fit=crop&q=80&w=2000',
            description: 'Experience the perfect fit with our bespoke blouse stitching service. Whether it is a simple cotton blouse or a heavy bridal design, our master tailors handle every detail with precision. We ensure proper lining, padding, and finishing to give you a boutique look at home.',
            features: [
                'Princess Cut & Katori Cut Expertise',
                'High-Quality Lining & Piping',
                'Sweat Pads & Bra Straps Included',
                'Custom Embroidery'
            ],
            types: [
                { name: 'Princess Cut Blouse', desc: 'Designed for a sleek fit, enhancing body contours without seams at the bust point.' },
                { name: 'Katori Cut Blouse', desc: 'Traditional style with a specific bust cup cut, ideal for perfect support and fitting.' },
                { name: 'Backless / Deep Neck', desc: 'Trendy designs with tassels and dori for a glamorous look.' },
                { name: 'Bridal Embroidery', desc: 'Heavy maggam work and zardosi detailing for wedding trousseaus.' }
            ],
            tips: [
                { title: 'Choosing the Right Fabric', desc: 'Silk and brocade hold shape well for heavy embroidery, while chiffon needs good lining.' },
                { title: 'Neckline Matters', desc: 'Select a neckline that complements your jewelry and face shape.' },
                { title: 'Sleeve Length', desc: 'Elbow-length sleeves are trending and add elegance to Kanjeevarams.' }
            ],
            faqs: [
                'Do you provide lining fabric?',
                'Can you replicate a celebrity design?',
                'How to measure cup size correctly?',
                'What is the turnaround time for bridal blouses?'
            ],
            pricing: [
                { type: 'Simple Blouse', price: '₹980' },
                { type: 'Lining Blouse', price: '₹1280' },
                { type: 'Padded Blouse', price: '₹1580' },
                { type: 'Bridal Maggam Work', price: '₹3500+' }
            ]
        },
        'lehenga-choli': {
            title: 'Best Lehenga Tailor In Chennai',
            heroImg: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2000',
            description: 'HRFashions is best known for its Lehenga stitching service. Our Chennai store has a wide range of perfect lehengas for weddings, parties, and more. We believe that our clients deserve only the best quality of work, and we ensure they receive just that by providing precision stitching with an eye for detail in every single garment we make.\n\nNo matter the complexity of your design, you can rest assured that we will do it right the first time and use only high-quality fabrics and accessories to bring your vision to life.',
            features: [
                'Full Transparency & Policies',
                '35 Years of Experience',
                'Live Call & Chat Support',
                'Door Step Measurement & Delivery'
            ],
            types: [
                { name: 'Kanchli Nalki Style', desc: 'A beautiful hand-woven pleated skirt from India, often made from cotton, silk, or georgette with colorful border embroidery.' },
                { name: 'Jari Embroidery Style', desc: 'Traditional style where light-colored threads are meticulously stitched into dark-colored fabric to create symmetrical floral motifs.' },
                { name: 'Banarsi Style', desc: 'A classic style that drapes the body like a second skin. Often made from velvet and adorned with jeweled appliqués or sequins.' },
                { name: 'Banjara Style', desc: 'Popular for intricate embroidery and unique patterns influenced by folk art. Heavily decorated with beadwork and embroidery.' }
            ],
            tips: [
                { title: 'Start With Comfort', desc: 'Make sure that you can stand or sit comfortably. The lehenga choli should not be too tight or too loose.' },
                { title: 'Invest In Fabrics', desc: 'Different fabrics suit different body types. Consult with our tailors to choose the perfect fabric for your silhouette.' },
                { title: 'Simple Silhouettes', desc: 'Opting for something simple that flatters your body will always be the best choice over following fleeting trends.' },
                { title: 'Local Weaves', desc: 'Consider beautiful Indian weaves like patola or banarasi which retain their natural sheen without needing ironing.' }
            ],
            faqs: [
                'How Much Does It Cost To Stitch A Lehenga?',
                'How Long Does It Take To Stitch A Lehenga?',
                'What Is Umbrella Cut Lehenga?',
                'How Much Cloth Is Needed For A Lehenga?',
                'Which Type of Lehenga Is Best?'
            ],
            pricing: [
                { type: 'Standard Lehenga Stitching', price: '₹2500' },
                { type: 'Designer Lehenga', price: '₹4500' },
                { type: 'Bridal Lehenga (Heavy)', price: '₹8500' },
                { type: 'Kali Lehenga', price: '₹3500' }
            ]
        },
        'anarkali': {
            title: 'Royal Anarkali Suits',
            heroImg: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=2000',
            description: 'The Anarkali suit allows women to keep a sense of heritage while embracing modern aesthetics. From floor-length gowns to asymmetrical cuts, we craft Anarkalis that make you look regal. Our tailors are experts in handling the volume of fabric and creating the perfect flare (gher) that spins with you.',
            features: [
                'Perfect Flare (Gher) Calculation',
                'Kalidar & Umbrella Cuts',
                'Heavy Border Attachment',
                'Canvas & Can-Can Layering'
            ],
            types: [
                { name: 'Floor Length Anarkali', desc: 'Gown-style suits that add height and elegance, perfect for evening receptions.' },
                { name: 'Angrakha Style', desc: 'Overlapping neckline tied with tassels, inspired by Mughal royalty.' },
                { name: 'Cape Style Anarkali', desc: 'Modern fusion style with a detached or attached cape, replacing the dupatta.' }
            ],
            tips: [
                { title: 'Fabric Flow', desc: 'Georgette and Chiffon are best for a flowy flare, while Silk gives a structured royal look.' },
                { title: 'Length Check', desc: 'Always wear your intended heels while measuring for floor-length Anarkalis.' }
            ],
            faqs: [
                'Can you convert a saree into an Anarkali?',
                'Do you add can-can for volume?',
                'How much fabric is needed for a full flare?'
            ],
            pricing: [
                { type: 'Basic Anarkali', price: '₹2200' },
                { type: 'Kalidar Anarkali', price: '₹2800' },
                { type: 'Party Wear Gown', price: '₹3500' },
                { type: 'Heavy Bridal Anarkali', price: '₹5500' }
            ]
        },
        'kids-frock': {
            title: 'Custom Kids Wear',
            heroImg: 'https://images.unsplash.com/photo-1621452773781-0f992ee61c67?auto=format&fit=crop&q=80&w=2000',
            description: 'Dress your little ones in comfort and style. From birthday frocks to festive lehengas, we stitch soft, skin-friendly garments with playful designs. We ensure extra margin for growth and durable stitching for active kids.',
            features: [
                'Skin-Friendly Fabrics',
                'Comfortable Linings',
                'Growth Margins Included',
                'Custom Embroidery'
            ],
            types: [
                { name: 'Party Frocks', desc: 'Fluffy net or satin frocks with bows and flower embellishments.' },
                { name: 'Ethnic Lehengas', desc: 'Miniature lehengas for festivals, lightweight and easy to carry.' },
                { name: 'Sharara Sets', desc: 'Trendy and comfortable sharara sets for little fashionistas.' }
            ],
            tips: [
                { title: 'Comfort First', desc: 'Avoid prick, heavy embroidery near the neck and underarms.' },
                { title: 'Size Up', desc: 'Kids grow fast; we always leave 2 inches of extra margin inside.' }
            ],
            faqs: [
                'Do you stitch mother-daughter matching outfits?',
                'What fabrics are best for sensitive skin?',
                'Do you make costumes for school functions?'
            ],
            pricing: [
                { type: 'Simple Frock', price: '₹650' },
                { type: 'Party Wear Gown', price: '₹1200' },
                { type: 'Kids Lehenga', price: '₹1500' },
                { type: 'School Uniform', price: '₹450' }
            ]
        },
        'kurti': {
            title: 'Daily & Office Wear Kurtis',
            heroImg: 'https://images.unsplash.com/photo-1616423668352-ecc6b3061699?auto=format&fit=crop&q=80&w=2000',
            description: 'Stay comfortable and chic with our custom-stitched Kurtis. Whether for office wear, casual outings, or small gatherings, we offer a variety of cuts and fits. Our tailors ensure the perfect shoulder drop and armhole fit that readymade brands often miss.',
            features: [
                'A-Line, Straight & High-Low Cuts',
                'Pocket Additions',
                'Office-Appropriate Necklines',
                'Perfect Shoulder Fitting'
            ],
            types: [
                { name: 'Straight Cut', desc: 'Professional and sleek, pairs perfectly with leggings or trousers.' },
                { name: 'Anarkali Kurti', desc: 'Flared and flowy, suitable for semi-casual events.' },
                { name: 'Kaftan Style', desc: 'Loose and breezy, perfect for summer comfort.' }
            ],
            tips: [
                { title: 'Choose Cotton', desc: 'For daily wear, pure cotton or linen is most breathable.' },
                { title: 'Mix & Match', desc: 'Neutral kurtis can be paired with multiple colored dupattas.' }
            ],
            faqs: [
                'Do you stitch pants with pockets?',
                'Can you alter readymade kurtis?',
                'What is the price for bulk stitching?'
            ],
            pricing: [
                { type: 'Simple Cotton Kurti', price: '₹450' },
                { type: 'Lining Kurti', price: '₹650' },
                { type: 'Designer Kurti', price: '₹950' },
                { type: 'Kurti with Pant Set', price: '₹950' }
            ]
        },
        'suit-pant': {
            title: 'Ladies Suit Pant Sets',
            heroImg: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=2000',
            description: 'Power dressing meets elegance. Our bespoke ladies pant suits are tailored to give you a sharp, professional silhouette. From formal office wear to chic evening tuxedos, we handle structured tailoring with expertise.',
            features: [
                'Perfect Trouser Fit',
                'Structured Blazers',
                'Premium Interlining',
                'Comfort Waistbands'
            ],
            types: [
                { name: 'Formal Office Suit', desc: 'Straight cut trousers with a single-breasted blazer.' },
                { name: 'Cigarette Pants', desc: 'Slim-fit trousers ending at the ankle, very trendy.' },
                { name: 'Wide Leg Sets', desc: 'Comfortable and stylish, perfect for summer formals.' }
            ],
            tips: [
                { title: 'Fabric Choice', desc: 'Wool blends or heavy ceremonial fabrics drapes best for suits.' },
                { title: 'Heel Height', desc: 'Decide your footwear height before finalizing trouser length.' }
            ],
            faqs: [
                'Do you stitch blazers for women?',
                'How to measure inseam length?',
                'Is lining required for white trousers?'
            ],
            pricing: [
                { type: 'Trouser Stitching', price: '₹650' },
                { type: 'Blazer (Unlined)', price: '₹1800' },
                { type: 'Full Suit Set', price: '₹2800' },
                { type: 'Vest / Waistcoat', price: '₹1200' }
            ]
        }
    };

    const data = serviceData[category] || serviceData['blouse-stitching']; // Fallback
    const isLehenga = category === 'lehenga-choli';

    return (
        <div className="bg-black-950 min-h-screen pb-20">
            {/* Service Hero */}
            <div className="relative h-[60vh] flex items-center justify-center">
                <img src={data.heroImg} alt={data.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-transparent to-black-950/80"></div>

                <div className="relative z-10 text-center px-6">
                    <span className="text-gold-500 uppercase tracking-widest text-sm font-bold mb-4 block">Premium Tailoring Service</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{data.title}</h1>
                    <Link to="/book-appointment" className="btn-gold">Book Consultation</Link>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                            <h2 className="text-2xl font-serif font-bold text-white mb-4">Service Overview</h2>
                            <p className="text-gray-300 leading-relaxed text-lg mb-6 whitespace-pre-line">
                                {data.description}
                            </p>

                            <h3 className="text-xl font-serif font-bold text-gold-500 mb-4">Why Choose Us?</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                                            <Check size={16} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Extended Content for Lehenga (or others if added) */}
                        {data.types && (
                            <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                                <h2 className="text-2xl font-serif font-bold text-white mb-6">Types of Styles We Craft</h2>
                                <div className="space-y-6">
                                    {data.types.map((type, idx) => (
                                        <div key={idx} className="border-b border-white/5 pb-4 last:border-0">
                                            <h4 className="text-lg font-bold text-gold-500 mb-2">{type.name}</h4>
                                            <p className="text-gray-400 text-sm">{type.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.tips && (
                            <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                                <h2 className="text-2xl font-serif font-bold text-white mb-6">Tips to Look Your Best</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.tips.map((tip, idx) => (
                                        <div key={idx} className="bg-black-950 p-4 border border-white/5">
                                            <span className="text-gold-500 font-bold text-xl mb-2 block">0{idx + 1}</span>
                                            <h4 className="font-bold text-white mb-2">{tip.title}</h4>
                                            <p className="text-gray-400 text-sm">{tip.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Process Section */}
                        <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                            <h2 className="text-2xl font-serif font-bold text-white mb-8">Our Handling Process</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: Ruler, title: 'Measurement', desc: 'Expert masterji visits your home for precise formatting.' },
                                    { icon: Scissors, title: 'Stitching', desc: 'Crafted in our sanitized workshop by specialists.' },
                                    { icon: Truck, title: 'Delivery', desc: 'Steam-pressed and delivered in premium packaging.' }
                                ].map((step, idx) => (
                                    <div key={idx} className="text-center p-6 bg-black-950 border border-white/5 hover:border-gold-500/50 transition-colors">
                                        <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gold-500 mb-4">
                                            <step.icon size={24} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-sm text-gray-400">{step.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex items-center gap-4 bg-gold-500/10 p-4 border border-gold-500/20">
                                <ShieldCheck className="text-gold-500 shrink-0" size={32} />
                                <div>
                                    <h5 className="text-white font-bold">Hygiene & Safety Guaranteed</h5>
                                    <p className="text-sm text-gray-400">All garments are sanitized and steam ironed before delivery.</p>
                                </div>
                            </div>
                        </div>

                        {data.faqs && (
                            <div className="bg-black-900 border border-white/10 p-8 md:p-10">
                                <h2 className="text-2xl font-serif font-bold text-white mb-6">Frequently Asked Questions</h2>
                                <ul className="space-y-4">
                                    {data.faqs.map((faq, idx) => (
                                        <li key={idx} className="bg-black-950 p-4 border border-white/5 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                                            <span className="text-gray-300 font-medium">{faq}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                    {/* Sidebar / Pricing */}
                    <div className="space-y-6">
                        <div className="bg-white text-black-950 p-8 sticky top-24">
                            <h3 className="text-2xl font-serif font-bold mb-6 border-b-2 border-gold-500 inline-block pb-1">Price List</h3>
                            <div className="space-y-4 mb-8">
                                {data.pricing.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0 hover:bg-gray-50 p-2 transition-colors">
                                        <span className="font-medium text-gray-700">{item.type}</span>
                                        <span className="font-bold text-navy-900">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-navy-50 p-6 rounded mb-6">
                                <p className="text-sm text-navy-800 italic mb-2">"The fitting was perfect for my wedding blouse. Highly recommended!"</p>
                                <p className="text-xs font-bold text-navy-600">- Sharma J.</p>
                            </div>

                            <Link to="/book-appointment" className="btn-navy w-full text-center py-4 text-base">
                                Book Now
                            </Link>
                            <p className="text-center text-xs text-gray-500 mt-4">Free pickup & delivery within Chennai.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
