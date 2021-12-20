const path = require("path")
const { createGlobPatternsForDependencies } = require("@nrwl/next/tailwind")

module.exports = {
  theme: {
    extend: {},
  },
  darkMode: "media",
  plugins: [],
  presets: [require("../../workspace.tailwind.js")],
  content: [
    path.join(__dirname, "pages/**/*.{js,ts,jsx,tsx}"),
    ...createGlobPatternsForDependencies(__dirname),
  ]
}
