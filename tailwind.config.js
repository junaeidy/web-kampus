import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'custom-blue': '#334eac',
                'custom-dark-blue': '#008bb9',
                'footer-bg': '#e7f1ff',
                'footer-bottom-bg': '#334eac',
                'section-bg': '#f3f4f6',
                'custom-green': '#7096d1'
            },
           transitionProperty: {
                'transform': 'transform',
            },
            transitionDuration: {
                '1000': '1000ms',
                '300': '300ms',
            },
            transitionTimingFunction: {
                'ease-in-out': 'ease-in-out',
            },
        },
    },

    plugins: [forms],
};
