/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Luxury Black - Deep, Rich, Premium
                black: {
                    50: '#f6f6f6',
                    100: '#e7e7e7',
                    200: '#d1d1d1',
                    300: '#b0b0b0',
                    400: '#888888',
                    500: '#6d6d6d',
                    600: '#5d5d5d',
                    700: '#4f4f4f',
                    800: '#454545',
                    900: '#3d3d3d',
                    950: '#0a0a0a', // Main Background
                },
                // Antique Gold - Luxury Accents
                gold: {
                    50: '#fbf7eb',
                    100: '#f5eacc',
                    200: '#ecd49c',
                    300: '#e0b863',
                    400: '#d59e3b',
                    500: '#c6862a', // Primary Gold
                    600: '#af6922',
                    700: '#8f4e1f',
                    800: '#773f20',
                    900: '#66351f',
                    950: '#3b1b0e',
                },
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1400px',
                },
            },
        },
    },
    plugins: [],
}

