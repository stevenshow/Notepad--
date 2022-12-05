import React, { useRef } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

export interface RichTextEditorProps {}

const initialValue = [
	{
		type: 'paragraph',
		children: [{ text: 'A line of text' }],
	},
];

export default function RichTextEditor(props: RichTextEditorProps) {
	const editor = useRef(withReact(createEditor()));

	return (
		<Slate editor={editor.current} value={initialValue}>
			<Editable />
		</Slate>
	);
}
