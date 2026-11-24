import type { Config } from 'tailwindcss';

/**
 * Offset Capital — three-colour design system.
 *
 *   BLUE   #1A4072  — sampled from the live Offset Capital logo mark
 *                     (inline SVG, `currentColor` resolving to rgb(26 64 114)).
 *                     This is `navy.700`, the brand anchor.
 *   WHITE  #FFFFFF  — core surface colour.
 *   GOLD   #C6A15B  — supporting accent (`gold.400`).
 *
 * Everything else in the palette is a tint or shade derived from the logo
 * blue, plus a narrow set of warm-neutral greys for body copy and hairlines.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F4F7FB',
          100: '#E4EBF4',
          200: '#C4D3E6',
          300: '#9BB2D0',
          400: '#6B8CB5',
          500: '#3F679B',
          600: '#2A5285',
          700: '#1A4072', // ← exact logo blue
          800: '#132F55',
          900: '#0D2039',
          950: '#07131F',
        },
        gold: {
          50: '#FBF7EF',
          100: '#F4EAD4',
          200: '#E8D3A8',
          300: '#DBBC7F',
          400: '#C6A15B', // ← brand gold
          500: '#B38C45',
          600: '#947137',
          700: '#73572C',
          800: '#4F3C1F',
          900: '#2E2312',
        },
        stone: {
          50: '#FAFAF8',
          100: '#F2F2EE',
          200: '#E5E5DF',
          300: '#CFCFC6',
          400: '#A3A39A',
          500: '#78786F',
          600: '#57574F',
          700: '#3D3D37',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Newsreader', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.25rem, 7.6vw, 8.5rem)', { lineHeight: '0.94', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(1.95rem, 5.4vw, 5.25rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3.9vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.018em' }],
        'display-sm': ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.14', letterSpacing: '-0.012em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'label-lg': ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      spacing: {
        section: 'clamp(5rem, 11vh, 9.5rem)',
        gutter: 'clamp(1.25rem, 5vw, 5.5rem)',
      },
      maxWidth: {
        shell: '96rem',
        measure: '38rem',
        'measure-lg': '46rem',
      },
      transitionTimingFunction: {
        offset: 'cubic-bezier(0.19, 1, 0.22, 1)',
        'offset-in': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'gold-sweep': {
          '0%': { transform: 'translateX(-101%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.19,1,0.22,1) both',
        marquee: 'marquee 46s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
