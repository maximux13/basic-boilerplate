const imports = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [imports(), tailwindcss('./tailwind.js'), autoprefixer()]
};
