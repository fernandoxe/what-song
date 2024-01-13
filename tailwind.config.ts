import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        open: ['var(--font-open-sans)', 'sans-serif'],
        indie: ['var(--font-indie-flower)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config
