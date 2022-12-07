import React from 'react';
import { RenderElementProps } from 'slate-react';

export default function PlainTextBlock(props: RenderElementProps) {
	return (
		<p {...props.attributes} className="p-2">
			{props.children}
		</p>
	);
}
