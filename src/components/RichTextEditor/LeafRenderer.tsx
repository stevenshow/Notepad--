import React from 'react';
import clsx from 'clsx';
import { RenderLeafProps } from 'slate-react';

// "Leaf"s are used for rendering the individual text nodes,
// "Element"s are used for rendering a chunk of leaves

export default function LeafRenderer({ attributes, leaf, children }: RenderLeafProps) {
	const { bold, italic, underline, color, code } = leaf.attributes ?? {};
	const baseClass = clsx({
		'font-bold': bold,
		underline,
		italic,
		color,
	});

	if (code) {
		return (
			<code
				{...attributes}
				className={clsx(
					baseClass,
					'text-sm',
					'outline',
					'rounded-sm',
					'p-1',
					'outline-1',
					'text-red-600',
					'outline-red-600'
				)}
			>
				{children}
			</code>
		);
	}

	return (
		<span {...attributes} className={baseClass}>
			{children}
		</span>
	);
}
