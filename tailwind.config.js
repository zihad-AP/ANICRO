/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#f8f9fa',
        surface: '#ffffff',
        anticnavy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16',
        },
        anticteal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0f766e',
          600: '#0d665f',
          700: '#0a4f49',
          800: '#115e59',
          900: '#134e4a',
        },
        mutedblue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        mutedamber: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fde68a',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        mutedred: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 1px 4px 0 rgba(15, 23, 42, 0.06)',
        'card-hover': '0 4px 12px 0 rgba(15, 23, 42, 0.07)',
      },
    },
  },
  plugins: [],
}

