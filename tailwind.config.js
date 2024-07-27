/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const { nextui } = require('@nextui-org/react');

module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        PlaywriteITModerna: ['"PlaywriteITModerna"', 'cursive'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
});
