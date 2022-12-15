import React from 'react';
import { CustomElement } from 'slate';
import { RenderElementProps } from 'slate-react';

// Due to how slate structures the DOM with its pre-built elements,
// it looks like we can't use an ol or ul element, since its children
// would not be li elements.

export default function ListBlock({ attributes, children, element }: RenderElementProps) {
	let indentation = 2;
	if (element.list?.indent) {
		indentation += element.list.indent;
	}

	// Can't do string interpolation (`ml-${indentation}`) with tailwind class names
	// since it messes up the compiler. I suspect it's because tailwind parses
	// the files configured in tailwind.config.js "content" for tailwind class
	// names and only includes those in the final stylesheet. Which makes sense
	// and is obviously a great optimization, to use only what you need.

	let indentClassName = '';
	switch (indentation) {
		case 2:
			indentClassName = 'ml-2';
			break;
		case 3:
			indentClassName = 'ml-3';
			break;
		case 4:
			indentClassName = 'ml-4';
			break;
		case 5:
			indentClassName = 'ml-5';
			break;
		case 6:
			indentClassName = 'ml-6';
			break;
	}

	return (
		<div className={indentClassName}>
			<ListItemPrefix {...element} />
			<span {...attributes}>{children}</span>
		</div>
	);
}

// TODO: use element to determine bullet/number type
function ListItemPrefix(element: CustomElement) {
	// Bullet ascii codes: https://www.alt-codes.net/bullet_alt_codes.php
	return (
		<span className="mr-2 select-none" contentEditable={false}>
			&#8226;
		</span>
	);
}
