import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
    },
    extend: {
      backgroundImage: {
        'background': "url('/src/assets/wallpaper.gif')",
      },
    },  
  },
  plugins: [],
}
export default config
