/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    plugins: [
      require('@fullhuman/postcss-purgecss')
    ],
    purgeCSS: {
      content: [
        './public/**/*.html',
        './src/**/*.scss',
        './src/**/*.ts'
      ]
    }
  };
  