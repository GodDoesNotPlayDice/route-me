/** @type {import('tailwindcss').Config} */
module.exports= {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
            colors: {
              theme: {
                light: "#f2f2e6",
                dark: "#07020a"
              },
              // primary
              indigoBlack: {
                50: "#bfbae1",
                100: "#9593cf",
                200: "#5460ad",
                300: "#28458d",
                400: "#0e366f",
                500: "#012c56",
                600: "#002541",
                700: "#001d30",
                800: "#001522",
                900: "#020d15",
              },
              //accent / terciary
              masterNacho: {
                50: "#faf7d3",
                100: "#fff9bc",
                200: "#fff089",
                300: "#ffe15b",
                400: "#ffce36",
                500: "#ffb71b",
                600: "#e18b0b",
                700: "#b66007",
                800: "#823907",
                900: "#481a07",
              },
              // secondary
              bee: {
                50: "#f8f5da",
                100: "#fdf8cc",
                200: "#fff3ab",
                300: "#ffe88b",
                400: "#ffd96e",
                500: "#f1bc52",
                600: "#d39339",
                700: "#ab6726",
                800: "#7a3d17",
                900: "#431b0b",
              },
              //error
              threateningRed: {
                50: "#f0d5c8",
                100: "#eebfab",
                200: "#e88e74",
                300: "#df5b44",
                400: "#d22c1f",
                500: "#be0707",
                600: "#a3000d",
                700: "#820015",
                800: "#5d0218",
                900: "#340414",
              },
            },
          },
  },
  plugins: [],
}
