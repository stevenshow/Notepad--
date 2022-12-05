import React, { useCallback, useRef } from 'react';
import { Editor, Element, Transforms, createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

export interface RichTextEditorProps {}

export default function RichTextEditor(props: RichTextEditorProps) {
	const editor = useRef(withReact(createEditor()));
	const initialValue = [
		{
			type: 'paragraph',
			children: [{ text: 'A line of text' }],
		},
	];

	const renderElement = useCallback<any>(p => {
		let El: any;
		switch (p.element.type) {
			case 'code':
				El = CodeElement;
				break;
			default:
				El = DefaultElement;
				break;
		}
		return <El {...p} />;
	}, []);

	return (
		<Slate editor={editor.current} value={initialValue}>
			<Editable
				renderElement={renderElement}
				onKeyDown={e => {
					if (e.key === '`' && e.ctrlKey) {
						// Prevent the "`" from being inserted by default.
						e.preventDefault();
						// Determine whether any of the currently selected blocks are code blocks.
						const [match] = Editor.nodes(editor.current, {
							match: n => Element.isElement(n) && n.type === 'code',
						});

						// Otherwise, set the currently selected blocks type to "code".
						Transforms.setNodes(
							editor.current,
							{ type: match ? 'paragraph' : 'code' },
							{ match: n => Editor.isBlock(editor.current, n) }
						);
					}
				}}
			/>
		</Slate>
	);
}

function CodeElement(props: any) {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
}

function DefaultElement(props: any) {
	return <p {...props.attributes}>{props.children}</p>;
}
