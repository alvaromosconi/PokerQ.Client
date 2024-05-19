/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'wooden': "url('./assets/images/wooden-background.jpg')",
				'table': "url('./assets/images/table.svg')",
			},
		}
	},
	plugins: [],
}

