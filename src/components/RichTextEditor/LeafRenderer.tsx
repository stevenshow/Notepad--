import React from 'react';
import clsx from 'clsx';
import { RenderLeafProps } from 'slate-react';

// "Leaf"s are used for rendering the individual text nodes,
// "Element"s are used for rendering a chunk of leaves

export default function LeafRenderer({ attributes, leaf, children }: RenderLeafProps) {
	const { bold, italic, underline } = leaf.attributes ?? {};
	return (
		<span
			{...attributes}
			className={clsx({
				'font-bold': bold,
				underline,
				italic,
			})}
		>
			{children}
		</span>
	);
}
