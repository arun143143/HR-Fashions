// Gallery photos. Planned to move to the Supabase designs table; keep the shape.
// TODO before launch: every photo here is an Unsplash placeholder. Replace with the shop's own work.
const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1600`;

const designs = [
    { title: 'Silk saree blouse', category: 'Blouse', image: img('1610030469983-98e550d6193c'), sortOrder: 1, active: true },
    { title: 'Bridal blouse with zari border', category: 'Blouse', image: img('1617627143750-d86bc21e42bb'), sortOrder: 2, active: true },
    { title: 'Flared red lehenga', category: 'Lehenga', image: img('1595777457583-95e059d581b8'), sortOrder: 3, active: true },
    { title: 'Floor-length anarkali', category: 'Anarkali', image: img('1609357605129-26f69add5d6e'), sortOrder: 4, active: true },
    { title: 'Party frock', category: 'Kids', image: img('1518831959646-742c3a14ebf7'), sortOrder: 5, active: true },
    { title: 'Maroon everyday kurti', category: 'Kurti', image: img('1585487000160-6ebcfceb0d03'), sortOrder: 6, active: true },
    { title: 'Peach summer kurti', category: 'Kurti', image: img('1596783074918-c84cb06531ca'), sortOrder: 7, active: true },
    { title: 'Tailored trouser set', category: 'Suit', image: img('1594633312681-425c7b97ccd1'), sortOrder: 8, active: true },
    { title: 'Evening gown', category: 'Anarkali', image: img('1566174053879-31528523f8ae'), sortOrder: 9, active: true },
];

export const designList = designs.filter((d) => d.active).sort((a, b) => a.sortOrder - b.sortOrder);
export const designCategories = [...new Set(designList.map((d) => d.category))];
