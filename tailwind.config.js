export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        void: '#030809',
        abyss: '#05100f',
        deep: '#07171a',
        hull: '#0b2226',
        steel: '#123036',
        cyan: {
          DEFAULT: '#2ee6d6',
          soft: '#7ff5e8',
          deep: '#0f8f8a',
          dim: '#146b6b',
        },
        aqua: '#4fd6ff',
        violet: {
          haze: '#7f6cff',
        },
        chalk: '#e6f6f4',
        mist: '#96b3b2',
      },
      fontFamily: {
        display: ['Oxanium', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tech: '0.28em',
      },
      keyframes: {
        pulseline: {
          '0%,100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        driftUp: {
          '0%': { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        pulseline: 'pulseline 2.8s ease-in-out infinite',
        driftUp: 'driftUp 400ms cubic-bezier(0.23,1,0.32,1) both',
      },
    },
  },
}
