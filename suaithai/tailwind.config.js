/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,css,js}","./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
         apple:["apple-system","system-ui"]
      }
    },
  },
  plugins: [],
}

