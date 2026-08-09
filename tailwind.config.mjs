/** @type {import('tailwindcss').Config} */
// Brand tokens mirror src/styles/tokens.css.
// Source of truth: computed styles on hyundai.com/in/en (Aug 2026).
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        hyundai: {
          blue: '#002C5F',
          blueDeep: '#001C3D',
          active: '#00A1C7',
          sand: '#E4DCD3',
          sand2: '#CFC8C2',
          tint: '#EEF3F8',
          // Legacy alias used by existing pages.
          cyan: '#00A1C7',
        },
        paper: '#FFFFFF',
        paper2: '#F5F6F7',
        ink: '#000000',
        ink2: '#303030',
        body: '#767676',
        muted: '#9A9A9A',
        rule: '#E0E0E0',
        ruleStrong: '#C4C4C4',
        wa: '#25D366',
        waDeep: '#1DA851',
      },
      fontFamily: {
        // Hyundai Sans is licensed; Inter stands in with Hyundai's weight/tracking behaviour.
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '2px',
        lg: '2px',
        xl: '4px',
        '2xl': '4px',
        '3xl': '4px',
        full: '999px',
      },
      letterSpacing: {
        display: '0.012em',
        eyebrow: '0.16em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        in: 'cubic-bezier(0.5, 0, 0.9, 0.4)',
        'in-out': 'cubic-bezier(0.6, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
