/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Це дуже важливо!
    ],
    theme: {
        extend: {},
    },
    plugins: [], // Залиште пустим, якщо tw-animate-css не плагін Tailwind
};