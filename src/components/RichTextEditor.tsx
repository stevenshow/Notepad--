import React, { useCallback, useRef } from 'react';
import clsx from 'clsx';
import { Editor, Element, Text, Transforms, createEditor } from 'slate';
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

	const renderLeaf = useCallback<any>(p => <Leaf {...p} />, []);

	return (
		<Slate editor={editor.current} value={initialValue}>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={e => {
					if (!e.ctrlKey) return;

					switch (e.key) {
						case '`':
							// Prevent the "`" from being inserted by default.
							e.preventDefault();

							// Determine whether any of the currently selected blocks are code blocks.
							// eslint-disable-next-line prefer-destructuring
							const [matchCode] = Editor.nodes(editor.current, {
								match: n => Element.isElement(n) && n.type === 'code',
							});

							const currentBlockIsCode = typeof matchCode !== 'undefined';

							// Otherwise, set the currently selected blocks type to "code".
							Transforms.setNodes(
								editor.current,
								{ type: currentBlockIsCode ? 'paragraph' : 'code' },
								{ match: n => Editor.isBlock(editor.current, n) }
							);
							break;
						case 'b':
							e.preventDefault();

							// eslint-disable-next-line prefer-destructuring
							const [matchBold] = Editor.nodes(editor.current, {
								match: n => Text.isText(n) && Boolean(n.bold),
							});

							const currentBlockIsBold = typeof matchBold !== 'undefined';

							Transforms.setNodes(
								editor.current,
								{ bold: !currentBlockIsBold },
								{ match: n => Text.isText(n), split: true }
							);
							break;
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

function Leaf(props: any) {
	return (
		// The class "font-bold" will be applied if props.leaf.bold is `true`
		// "font-bold" being a class that comes from tailwind
		<span {...props.attributes} className={clsx({ 'font-bold': props.leaf.bold })}>
			{props.children}
		</span>
	);
}
