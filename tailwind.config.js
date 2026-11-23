/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4F2ED',
          50: '#FBFAF7',
          100: '#F4F2ED',
          200: '#EAE7DF',
          300: '#DCD8CD',
        },
        ink: {
          DEFAULT: '#101217',
          950: '#0B0C10',
          900: '#101217',
          800: '#1A1D24',
          700: '#262A33',
          600: '#3A3F4B',
          500: '#555B67',
          400: '#7A808C',
          300: '#A3A8B2',
          200: '#C9CCD3',
        },
        signal: {
          DEFAULT: '#E5452C',
          50: '#FDF0EC',
          100: '#FADCD3',
          400: '#EE6A52',
          500: '#E5452C',
          600: '#C7361F',
          700: '#A12A17',
        },
        cobalt: {
          DEFAULT: '#2F4BFF',
          100: '#E2E6FF',
          500: '#2F4BFF',
          600: '#2338D6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', '"Yu Gothic"', 'Meiryo', 'sans-serif'],
      },
      maxWidth: {
        shell: '1320px',
      },
      letterSpacing: {
        tightest: '-0.055em',
      },
      boxShadow: {
        hair: '0 0 0 1px rgba(16,18,23,0.08)',
        lift: '0 1px 0 rgba(16,18,23,0.04), 0 12px 32px -12px rgba(16,18,23,0.18)',
        float: '0 2px 4px rgba(16,18,23,0.04), 0 30px 60px -20px rgba(16,18,23,0.28)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'scroll-line': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        pulsedot: {
          '0%': { boxShadow: '0 0 0 0 rgba(229,69,44,0.45)' },
          '70%': { boxShadow: '0 0 0 8px rgba(229,69,44,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(229,69,44,0)' },
        },
        flow: { from: { strokeDashoffset: '24' }, to: { strokeDashoffset: '0' } },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'scroll-line': 'scroll-line 2.4s cubic-bezier(0.65,0,0.35,1) infinite',
        pulsedot: 'pulsedot 2s ease-out infinite',
        flow: 'flow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
};
