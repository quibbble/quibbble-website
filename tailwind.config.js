const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter'],
      lobster: ['Lobster'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'slate': '#BCC2BE',
      'gray': '#B4BBB6',
      'dark': {
        900: '#131313',
        800: '#181818',
        700: '#1D1C1E',
        600: '#262528',
        500: '#3C3B40'
      },
      'yellow': '#FFCB31',
      'red': '#FF3131',
      'orange': '#FF5631',
      'turquoise': '#31FFA8',
      'indigo': '#6731FF',
      'sky': '#31C1FF',
      'blue': '#545bff',
      'pink': '#FF31D2',
      'green': '#35FF31',
      'magenta': '#E231FF',
      'lime': '#C9FF31',
      'purple': '#8C31FF'

    },
    extend: {
      animation: { fade: 'fadeOut 500ms ease-in-out' },
      keyframes: () => ({ fadeOut: { '0%': { opacity: 0 }, '100%': { opacity: 1 } }})},
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        { "animation-delay": (value) => {return { "animation-delay": value } } },
        { values: theme("transitionDelay") }
      );
    }),
  ],
  safelist: [
    { pattern: /text-*/ },
    { pattern: /bg-*/ },
    { pattern: /fill-*/ },
    { pattern: /outline-*/ },
    "hover:text-yellow",
    "hover:text-red",
    "hover:text-orange",
    "hover:text-turquoise",
    "hover:text-indigo",
    "hover:text-sky",
    "hover:text-blue",
    "hover:text-pink",
    "hover:text-green",
    "hover:text-magenta",
    "hover:text-lime",
    "hover:bg-yellow",
    "hover:bg-red",
    "hover:bg-orange",
    "hover:bg-turquoise",
    "hover:bg-indigo",
    "hover:bg-sky",
    "hover:bg-blue",
    "hover:bg-pink",
    "hover:bg-green",
    "hover:bg-magenta",
    "hover:bg-lime",
    "group-hover:fill-purple",
    "=hover:shadow-indigo",
    "group-hover:fill-yellow",
    "group-hover:fill-red",
    "group-hover:fill-orange",
    "group-hover:fill-turquoise",
    "group-hover:fill-indigo",
    "group-hover:fill-sky",
    "group-hover:fill-blue",
    "group-hover:fill-pink",
    "group-hover:fill-green",
    "group-hover:fill-magenta",
    "group-hover:fill-lime",
    "group-hover:fill-purple",
    "animation-delay-[50ms]",
    "animation-delay-[100ms]",
    "animation-delay-[150ms]",
    "animation-delay-[200ms]",
    "animation-delay-[250ms]",
    "animation-delay-[300ms]",
    "animation-delay-[350ms]",
    "animation-delay-[400ms]",
    "animation-delay-[450ms]",
    "animation-delay-[500ms]",
    "animation-delay-[550ms]",
    "animation-delay-[600ms]",
    "fill-red"
  ]
}
