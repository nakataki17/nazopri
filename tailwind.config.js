module.exports = {
  mode:"jit",
  content: ["./public/index.html","./src/App.vue","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      title:[
        '"Noto Sans JP"'
      ]
    }
  },
  plugins: [require("daisyui")],
}
