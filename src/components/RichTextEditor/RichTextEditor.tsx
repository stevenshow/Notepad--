import React, { useCallback, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { Editor, Element, Text, Transforms, createEditor } from 'slate';
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';

type RenderElement = (props: RenderElementProps) => JSX.Element;
type RenderLeaf = (props: RenderLeafProps) => JSX.Element;

export interface RichTextEditorProps {}

export default function RichTextEditor(props: RichTextEditorProps) {
	const editor = useRef(withReact(createEditor()));
	const initialValue = useMemo(() => {
		const content = localStorage.getItem('content');
		if (content) {
			return JSON.parse(content);
		}

		return [
			{
				type: 'paragraph',
				children: [{ text: 'A line of text' }],
			},
		];
	}, []);
	const renderElement = useCallback<RenderElement>(p => {
		let El: RenderElement;
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

	const renderLeaf = useCallback<RenderLeaf>(p => <Leaf {...p} />, []);

	return (
		<Slate
			editor={editor.current}
			value={initialValue}
			onChange={value => {
				const isAstChange = editor.current.operations.some(op => op.type !== 'set_selection');
				if (isAstChange) {
					const content = JSON.stringify(value);
					localStorage.setItem('content', content);
				}
			}}
		>
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

function CodeElement(props: RenderElementProps) {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
}

function DefaultElement(props: RenderElementProps) {
	return <p {...props.attributes}>{props.children}</p>;
}

function Leaf(props: RenderLeafProps) {
	return (
		// The class "font-bold" will be applied if props.leaf.bold is `true`
		// "font-bold" being a class that comes from tailwind
		<span {...props.attributes} className={clsx({ 'font-bold': props.leaf.bold })}>
			{props.children}
		</span>
	);
}
