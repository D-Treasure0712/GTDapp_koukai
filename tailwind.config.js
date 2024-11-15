/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			50: '#eff6ff',
			100: '#dbeafe',
			200: '#bfdbfe',
			300: '#93c5fd',
			400: '#60a5fa',
			500: '#3b82f6',
			600: '#2563eb',
			700: '#1d4ed8',
			800: '#1e40af',
			900: '#1e3a8a',
		  },
		},
		animation: {
		  'wave': 'wave 15s ease-in-out infinite',
		},
	  },
	},
	plugins: [
	  require('@tailwindcss/forms'),
	],
	safelist: [
	  'bg-blue-100',
	  'bg-green-100',
	  'bg-purple-100',
	  'text-blue-600',
	  'text-green-600',
	  'text-purple-600',
	],
  }