module.exports = {
  mode:"jit",
  purge:["./public/index.html","./src/App.vue","./src/**/*.{vue,js,ts,jsx,tsx}"],
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
