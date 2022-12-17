import React from 'react';
import clsx from 'clsx';
import { TextAttributes } from 'slate';
import { RenderLeafProps, useSelected } from 'slate-react';

// "Leaf"s are used for rendering the individual text nodes,
// "Element"s are used for rendering a chunk of leaves

export default function LeafRenderer({ attributes, leaf, children }: RenderLeafProps) {
	const leafAttrs = leaf.attributes ?? {};

	const RenderElement = getRenderElement(leafAttrs);
	const className = getClassNames(leafAttrs);
	const hasSelection = useSelected();

	return (
		<RenderElement {...attributes} className={clsx(className, { 'has-selection': hasSelection })}>
			{children}
		</RenderElement>
	);
}

function getRenderElement({ size, code }: TextAttributes): React.ElementType {
	if (code) return 'code';
	switch (size) {
		case 'h1':
			return 'h1';
		case 'h2':
			return 'h2';
		case 'h3':
			return 'h3';
		case 'h4':
			return 'h4';
		default:
			return 'span';
	}
}

function getClassNames({ bold, italic, underline, color, code, size }: TextAttributes): string {
	let className = clsx({
		'font-bold': bold,
		underline,
		italic,
		color,
	});

	if (code) {
		className = clsx(className, 'outline', 'rounded-sm', 'p-1', 'outline-1', 'text-red-600', 'outline-gray-400');
		if (size !== 'L' && size !== 'M' && size !== 'XS' && size !== 'XL') {
			className = clsx(className, 'text-sm');
		}
	}

	switch (size) {
		case 'XS':
			className = clsx(className, 'text-xs');
			break;
		case 'S':
			className = clsx(className, 'text-sm');
			break;
		case 'L':
			className = clsx(className, 'text-lg');
			break;
		case 'XL':
			className = clsx(className, 'text-xl');
			break;
		case 'h1':
			className = clsx(className, 'mt-2', 'mb-1');
			break;
		case 'h2':
			className = clsx(className, 'mt-1', 'mb-1');
			break;
		case 'h3':
			className = clsx(className, 'mt-1', 'mb-0');
			break;
		case 'h4':
			className = clsx(className, 'mt-0', 'mb-0');
			break;
		default:
			className = clsx(className, 'text-base');
			break;
	}

	return className;
}
