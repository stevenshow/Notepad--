import React from 'react';
import { RenderElementProps } from 'slate-react';

export const PlaceholderBlockElement = {
	type: 'placeholder',
	children: [{ text: '' }],
};

export default function PlaceholderBlock(props: RenderElementProps) {
	return (
		<div
			{...props.attributes}
			className="cursor-default p-2 italic text-gray-400 transition-colors focus-within:bg-gray-100 hover:bg-gray-100"
		>
			{props.children}
			<span
				data-placeholder-text="Start typing some text here!"
				className=" after:absolute after:top-2 after:content-[attr(data-placeholder-text)]"
			/>
		</div>
	);
}
