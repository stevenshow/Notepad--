import React from 'react';
import clsx from 'clsx';
import { RenderLeafProps } from 'slate-react';

export default function LeafRenderer({ attributes, leaf, children }: RenderLeafProps) {
	return (
		<span
			{...attributes}
			className={clsx({
				'font-bold': leaf.bold,
				italic: leaf.italic,
				underline: leaf.underline,
			})}
		>
			{children}
		</span>
	);
}
