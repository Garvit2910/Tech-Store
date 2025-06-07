/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'primary-50': '#EFF6FF', // Very light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'primary-900': '#1E3A8A', // Very dark blue (900-level shade) - blue-900

        // Secondary Colors
        'secondary': '#64748B', // Balanced gray-blue (secondary) - slate-500
        'secondary-50': '#F8FAFC', // Very light gray-blue (50-level shade) - slate-50
        'secondary-100': '#F1F5F9', // Light gray-blue (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light gray-blue (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Medium-light gray-blue (300-level shade) - slate-300
        'secondary-400': '#94A3B8', // Medium gray-blue (400-level shade) - slate-400
        'secondary-600': '#475569', // Dark gray-blue (600-level shade) - slate-600
        'secondary-700': '#334155', // Darker gray-blue (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Very dark gray-blue (800-level shade) - slate-800
        'secondary-900': '#0F172A', // Darkest gray-blue (900-level shade) - slate-900

        // Accent Colors
        'accent': '#10B981', // Fresh green (accent) - emerald-500
        'accent-50': '#ECFDF5', // Very light green (50-level shade) - emerald-50
        'accent-100': '#D1FAE5', // Light green (100-level shade) - emerald-100
        'accent-200': '#A7F3D0', // Light green (200-level shade) - emerald-200
        'accent-400': '#34D399', // Medium-light green (400-level shade) - emerald-400
        'accent-600': '#059669', // Dark green (600-level shade) - emerald-600
        'accent-700': '#047857', // Darker green (700-level shade) - emerald-700
        'accent-900': '#064E3B', // Darkest green (900-level shade) - emerald-900

        // Background Colors
        'background': '#F8FAFC', // Soft off-white (background) - slate-50
        'surface': '#FFFFFF', // Pure white (surface) - white

        // Text Colors
        'text-primary': '#1E293B', // Rich dark gray (text primary) - slate-800
        'text-secondary': '#64748B', // Medium gray (text secondary) - slate-500

        // Status Colors
        'success': '#059669', // Deeper green (success) - emerald-600
        'success-50': '#ECFDF5', // Very light green (success 50) - emerald-50
        'success-100': '#D1FAE5', // Light green (success 100) - emerald-100

        'warning': '#D97706', // Warm orange (warning) - amber-600
        'warning-50': '#FFFBEB', // Very light orange (warning 50) - amber-50
        'warning-100': '#FEF3C7', // Light orange (warning 100) - amber-100

        'error': '#DC2626', // Clear red (error) - red-600
        'error-50': '#FEF2F2', // Very light red (error 50) - red-50
        'error-100': '#FEE2E2', // Light red (error 100) - red-100

        // Border Colors
        'border': '#E2E8F0', // Minimal border (border) - slate-200
        'border-light': '#F1F5F9', // Light border (border light) - slate-100
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'elevation-sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'elevation-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}