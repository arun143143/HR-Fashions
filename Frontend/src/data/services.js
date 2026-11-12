// Service content: the single source of truth for service pages, home tiles and footer links.
// Later this moves to Supabase (see supabase/README.md); keep the same shape so the swap is small.
// Voice and claim rules: docs/marketing.md.
//
// TODO before launch, the owner confirms:
// - every price (all placeholders)
// - every FAQ answer that states what the shop does (lining supply, alterations, matching sets)
// - the Unsplash photos are replaced with the shop's own work

const servicesBySlug = {
    'blouse-stitching': {
        slug: 'blouse-stitching',
        name: 'Blouses',
        title: 'Blouse stitching in Chennai',
        heroImg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=2000',
        description:
            'A saree is only as good as the blouse under it. We cut every blouse to your measurements, line it properly and fit it on you, so it sits flat at the back, holds at the shoulder and still lets you lift your arms.\n\nBring your saree and a photo of the design you like: simple cotton blouses for every day, lined silk blouses for functions, and maggam work for weddings.',
        features: [
            'Princess cut and katori cut',
            'Lining and piping in a matching shade',
            'Padding and hooks placed for your fit',
            'Maggam and aari embroidery on request',
        ],
        types: [
            { name: 'Princess cut', desc: 'Seams run over the bust instead of darts, so the blouse follows your shape closely. Good for silk and brocade.' },
            { name: 'Katori cut', desc: 'A cup-shaped panel under the bust gives shape and support without padding. A classic for silk sarees.' },
            { name: 'Back and neck designs', desc: 'Deep backs, boat necks, collars and dori ties with tassels. Bring a photo and we will work out what suits the saree.' },
            { name: 'Bridal maggam work', desc: 'Hand embroidery with zari, stones and beads, planned with you around the saree border.' },
        ],
        tips: [
            { title: 'Bring the saree to the fitting', desc: 'We match the lining, the piping and the sleeve length to the border.' },
            { title: 'Choose the neckline with your jewellery', desc: 'A heavy necklace sits best on a round or boat neck. A long chain suits a deeper front.' },
            { title: 'Decide the sleeve length early', desc: 'Elbow-length sleeves need more fabric than short ones. Tell us before we cut.' },
        ],
        faqs: [
            { question: 'Do you supply the lining?', answer: 'Yes. We can supply lining in a matching shade, or use your own. Tell us at the fitting.' },
            { question: 'Can you copy a design from a photo?', answer: 'Yes. Send the photo on WhatsApp. If your fabric cannot hold that design, we will tell you before we cut.' },
            { question: 'Can you stitch from a blouse that already fits me?', answer: 'Yes. Bring a blouse that fits you well. We take measurements from it as well as from you.' },
            { question: 'How long does a bridal blouse take?', answer: 'It depends on the embroidery. We agree the delivery date with you before we start. For a wedding, book a few weeks ahead.' },
        ],
        pricing: [
            { type: 'Simple blouse', price: '₹980' },
            { type: 'Lined blouse', price: '₹1280' },
            { type: 'Padded blouse', price: '₹1580' },
            { type: 'Bridal maggam work', price: 'From ₹3500' },
        ],
    },
    'lehenga-choli': {
        slug: 'lehenga-choli',
        name: 'Lehengas',
        title: 'Lehenga stitching in Chennai',
        heroImg: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2000',
        description:
            'A lehenga has to look right when you stand still and when you dance. We set the flare, the waistband and the length to your measurements and your heels, then fit it on you before we finish the hem.\n\nBridal lehengas, reception and party lehengas, and lighter ones for functions, stitched from your fabric or from a set you have bought.',
        features: [
            'Kali and umbrella cuts',
            'Can-can and lining for volume',
            'Waist and length set with your heels on',
            'Choli and dupatta finished to match',
        ],
        types: [
            { name: 'Kalidar', desc: 'Made from many tapered panels, so it flares evenly all round. Good for heavy fabric and borders.' },
            { name: 'Umbrella cut', desc: 'Cut as a circle for a soft, swinging flare. Good for georgette and chiffon.' },
            { name: 'A-line', desc: 'Fitted at the waist and gently flared. Easy to wear through a long function.' },
            { name: 'Bridal', desc: 'Heavy fabric, can-can layers and a structured choli, planned around the border and the embroidery.' },
        ],
        tips: [
            { title: 'Wear your heels to the fitting', desc: 'We set the hem with the footwear you will wear on the day.' },
            { title: 'Tell us how long you will wear it', desc: 'For a long wedding day we keep the waist comfortable and the skirt as light as the fabric allows.' },
            { title: 'Check the fabric length first', desc: 'Flared cuts need more fabric. Bring the full set and we will tell you what it allows.' },
        ],
        faqs: [
            { question: 'How much does lehenga stitching cost?', answer: 'See the starting prices on this page. The final price depends on the cut, the lining and any work, and we confirm it before we start.' },
            { question: 'How long does a lehenga take?', answer: 'We agree the date with you before we start. For a wedding, book early, especially in the wedding season.' },
            { question: 'What is the difference between kali and umbrella cut?', answer: 'A kali lehenga is made of many tapered panels and holds a heavy border well. An umbrella cut is one circle of fabric and swings more softly.' },
            { question: 'How much fabric do I need?', answer: 'It depends on the cut and your height. Send us a photo of the fabric and its length on WhatsApp and we will tell you.' },
        ],
        pricing: [
            { type: 'Lehenga stitching', price: '₹2500' },
            { type: 'Kali lehenga', price: '₹3500' },
            { type: 'Designer lehenga', price: '₹4500' },
            { type: 'Bridal lehenga', price: '₹8500' },
        ],
    },
    'anarkali': {
        slug: 'anarkali',
        name: 'Anarkalis',
        title: 'Anarkali stitching in Chennai',
        heroImg: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=2000',
        description:
            'An anarkali is all about the flare: how it falls when you stand and how it moves when you walk. We work out the panels for your height and your fabric, and fit the bodice on you before the skirt is joined.\n\nFloor-length gowns for receptions, knee-length anarkalis for festivals, and simpler ones for everyday functions.',
        features: [
            'Flare planned for your height',
            'Kalidar and umbrella cuts',
            'Borders and lace set evenly',
            'A can-can layer when you want more volume',
        ],
        types: [
            { name: 'Floor-length', desc: 'A gown-style anarkali that reaches the floor, measured with the heels you will wear.' },
            { name: 'Angrakha', desc: 'An overlapping front tied at the side, with or without tassels.' },
            { name: 'Cape style', desc: 'A sheer cape over the anarkali in place of a dupatta.' },
        ],
        tips: [
            { title: 'Flow or structure', desc: 'Georgette and chiffon fall softly. Silk holds its shape and looks more formal.' },
            { title: 'Measure in your heels', desc: 'For a floor-length anarkali we set the length with your footwear on.' },
        ],
        faqs: [
            { question: 'Can you make an anarkali from a saree?', answer: 'Often, yes. It depends on the length of the saree and where the border falls. Bring it and we will tell you what is possible.' },
            { question: 'Do you add can-can?', answer: 'Yes, if you want more volume. We can show you the difference at the fitting.' },
            { question: 'How much fabric do I need for a full flare?', answer: 'It depends on your height and the number of panels. Send us a photo of the fabric and its length on WhatsApp.' },
        ],
        pricing: [
            { type: 'Simple anarkali', price: '₹2200' },
            { type: 'Kalidar anarkali', price: '₹2800' },
            { type: 'Party gown', price: '₹3500' },
            { type: 'Bridal anarkali', price: '₹5500' },
        ],
    },
    'kids-frock': {
        slug: 'kids-frock',
        name: 'Girls’ wear',
        title: 'Frocks and festive wear for girls',
        heroImg: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=2000',
        description:
            'Children grow fast and never sit still, so we stitch for both. Soft lining wherever the fabric touches skin, no scratchy work at the neck or underarms, and extra margin inside the seams so the dress can be let out later.\n\nBirthday frocks, pattu pavadai for festivals, and lehenga and sharara sets, stitched to your daughter’s measurements.',
        features: [
            'Soft lining against the skin',
            'No heavy work at the neck or underarms',
            'Extra seam margin to let out later',
            'Matching outfits for mother and daughter',
        ],
        types: [
            { name: 'Party frocks', desc: 'Net or satin frocks with layers, bows and flowers, lined so they do not scratch.' },
            { name: 'Pattu pavadai', desc: 'The traditional silk skirt and blouse for festivals and functions, with the border placed to show.' },
            { name: 'Lehenga and sharara sets', desc: 'Light, easy-to-move-in sets for weddings and family functions.' },
        ],
        tips: [
            { title: 'Comfort first', desc: 'Keep heavy embroidery away from the neck and underarms, where children feel it most.' },
            { title: 'Leave room to grow', desc: 'We keep extra margin in the seams so the dress can be let out as she grows.' },
        ],
        faqs: [
            { question: 'Do you stitch matching mother and daughter outfits?', answer: 'Yes. Bring enough fabric for both and we will stitch them as a set.' },
            { question: 'Which fabrics are best for sensitive skin?', answer: 'Cotton and soft linings are the gentlest. For silk or net, we line every part that touches the skin.' },
            { question: 'Can you stitch a costume for a school function?', answer: 'Tell us what you need and the date on WhatsApp. If we can do it well in that time, we will say yes.' },
        ],
        pricing: [
            { type: 'Simple frock', price: '₹650' },
            { type: 'Party frock', price: '₹1200' },
            { type: 'Pattu pavadai or lehenga set', price: '₹1500' },
            { type: 'School uniform', price: '₹450' },
        ],
    },
    'kurti': {
        slug: 'kurti',
        name: 'Kurtis',
        title: 'Kurti stitching for daily and office wear',
        heroImg: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=2000',
        description:
            'A readymade kurti fits nobody exactly: the shoulder slips, the armhole pulls, or the length is wrong. We stitch kurtis to your measurements, so the clothes you wear most often are the ones that fit best.\n\nStraight, A-line and anarkali kurtis, with pants, palazzos or a salwar to match.',
        features: [
            'Straight, A-line and high-low cuts',
            'Pockets on request',
            'Necklines that work for the office',
            'Shoulder and armhole cut to fit',
        ],
        types: [
            { name: 'Straight cut', desc: 'Clean and simple. Goes with leggings, pants or trousers.' },
            { name: 'Anarkali kurti', desc: 'Flared from the waist, for functions and festive days.' },
            { name: 'Kaftan style', desc: 'Loose and airy, for the hottest days of the year.' },
        ],
        tips: [
            { title: 'Choose cotton for every day', desc: 'Pure cotton and linen breathe best in the Chennai heat.' },
            { title: 'Plan one set of colours', desc: 'A few kurtis in plain colours go with many dupattas and pants.' },
        ],
        faqs: [
            { question: 'Can you add pockets?', answer: 'Yes, in the side seams of the kurti or in the pants. Ask at the fitting.' },
            { question: 'Do you alter readymade kurtis?', answer: 'Yes. We can change the length, take in the sides, shorten the sleeves or fix the shoulders.' },
            { question: 'Can I give several kurtis at once?', answer: 'Yes. Bring all the fabrics together and we will agree one delivery date for the whole set.' },
        ],
        pricing: [
            { type: 'Simple cotton kurti', price: '₹450' },
            { type: 'Lined kurti', price: '₹650' },
            { type: 'Designer kurti', price: '₹950' },
            { type: 'Kurti with pants', price: '₹950' },
        ],
    },
    'suit-pant': {
        slug: 'suit-pant',
        name: 'Pant suits',
        title: 'Pant suits and trousers for women',
        heroImg: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=2000',
        description:
            'A suit has nowhere to hide a poor fit. We cut the trousers for your waist, your hips and the shoes you will wear, and shape the blazer to your shoulders, so it looks sharp without feeling tight.\n\nFormal suits for work, cigarette pants and wide-leg trousers, and blazers on their own.',
        features: [
            'Trousers cut for your shoes',
            'Blazers shaped at the shoulder',
            'Interlining for structure',
            'A waistband that stays comfortable when you sit',
        ],
        types: [
            { name: 'Office suit', desc: 'Straight trousers with a single-breasted blazer.' },
            { name: 'Cigarette pants', desc: 'Slim trousers that end at the ankle.' },
            { name: 'Wide-leg sets', desc: 'Loose trousers that move well in the heat, with a matching top or blazer.' },
        ],
        tips: [
            { title: 'Choose a fabric with some weight', desc: 'Wool blends and suiting fabrics hold a crease and fall better than thin cotton.' },
            { title: 'Decide your heel height first', desc: 'We set the trouser length with the shoes you will wear most.' },
        ],
        faqs: [
            { question: 'Do you stitch blazers for women?', answer: 'Yes, lined or unlined. See the starting prices on this page.' },
            { question: 'How do you set the trouser length?', answer: 'With the shoes you plan to wear. Bring them to the fitting.' },
            { question: 'Do white trousers need lining?', answer: 'Usually yes, so they are not see-through. We will check your fabric against the light.' },
        ],
        pricing: [
            { type: 'Trousers', price: '₹650' },
            { type: 'Waistcoat', price: '₹1200' },
            { type: 'Blazer, unlined', price: '₹1800' },
            { type: 'Full suit', price: '₹2800' },
        ],
    },
};

export const serviceList = Object.values(servicesBySlug);
export const getService = (slug) => servicesBySlug[slug];
export const DEFAULT_SERVICE_SLUG = 'blouse-stitching';
