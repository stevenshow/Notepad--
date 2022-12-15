module.exports = {
	content: ['src/index.html', 'src/**/*.{js,ts,jsx,tsx}', '.storybook/preview-head.html'],
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
		fontFamily: {
			sans: ['Inter', 'ui-sans-serif', 'system-ui'],
		},
	},
	plugins: [],
};
