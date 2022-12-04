export default function generator(plop) {
	plop.setGenerator('component', {
		description: 'create a new component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component name (InCamelCase)',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{name}}.tsx',
				templateFile: 'templates/component.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/stories/{{name}}.story.tsx',
				templateFile: 'templates/component.story.tsx.hbs',
			},
		],
	});
}
