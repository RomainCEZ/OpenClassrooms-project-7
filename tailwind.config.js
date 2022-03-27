module.exports = {
  content: [
    "./front/index.html",
    "./front/src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      }, 
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
