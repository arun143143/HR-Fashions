// Business details shown across the site. Change them here only.
// TODO before launch: confirm the phone number, email, address, hours and delivery note are correct for HR Fashions.
export const site = {
    name: 'HR Fashions',
    brandMark: 'HRFASHIONS',
    tagline: 'Tailoring for women and girls in Chennai',
    phone: '+91 882-646-6345',
    phoneHref: 'tel:+918826466345',
    whatsappNumber: '918826466345',
    email: 'contact@hrfashions.in',
    address: '16/95, Ottagapalayam, Sector 15, Vadapalani, Chennai, Tamil Nadu 600078',
    deliveryNote: 'Free pickup & delivery within Chennai.',
    heroImage:
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=75&w=2000',
    // Leave hours empty until the owner confirms them; the footer hides the line when empty.
    hours: '',
    social: { instagram: '', facebook: '' },
};

export const whatsappHref = `https://wa.me/${site.whatsappNumber}`;
export const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
