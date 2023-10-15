/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{ts,vue}"],
  theme: {
    extend: {
      colors: {
        pri: {
          DEFAULT: "#ff7f50",
          hover: "#ff8b61",
          active: "#e57248",
          contrast: colors.white,
        },
        sec: {
          DEFAULT: colors.cyan[800],
          hover: colors.cyan[700],
          active: colors.cyan[900],
          contrast: colors.white,
        },
        neu: {
          DEFAULT: colors.stone[700],
          hover: colors.stone[600],
          active: colors.stone[800],
          contrast: colors.white,
        },
        suc: {
          DEFAULT: colors.green[800],
          hover: colors.green[700],
          active: colors.green[900],
          contrast: colors.white,
        },
        dng: {
          DEFAULT: colors.red[800],
          hover: colors.red[700],
          active: colors.red[900],
          contrast: colors.white,
        },
        wrn: {
          DEFAULT: colors.amber[500],
          hover: colors.amber[400],
          active: colors.amber[600],
          contrast: colors.white,
        },
        inf: {
          DEFAULT: colors.blue[500],
          hover: colors.blue[400],
          active: colors.blue[600],
          contrast: colors.white,
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
