import React, { useCallback, useRef } from 'react';
import { Editor, Element, Text, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { DefaultElement, withReact } from 'slate-react';
import { RenderElement } from '.';
import { RichTextEditorProps } from './RichTextEditor';
import CodeBlock from './content-blocks/CodeBlock';
import PlaceholderBlock, { PlaceholderBlockElement } from './content-blocks/PlaceholderBlock';
import PlainTextBlock from './content-blocks/PlainTextBlock';

export default function useRichTextEditor({ value, onChange }: RichTextEditorProps) {
	const editorRef = useRef(withReact(withHistory(createEditor())));
	const editor = editorRef.current;

	const renderElement = useCallback<RenderElement>(props => {
		let El: RenderElement;
		switch (props.element.type) {
			case 'code':
				El = CodeBlock;
				break;
			case 'paragraph':
				El = PlainTextBlock;
				break;
			case 'placeholder':
				El = PlaceholderBlock;
				break;
			default:
				El = DefaultElement;
				break;
		}

		return El(props);
	}, []);

	if (value.length === 0) {
		value.push(PlaceholderBlockElement);
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (editor.children.length === 1 && e.key.length === 1) {
			Transforms.setNodes(
				editor,
				{ type: 'paragraph', children: [{ text: e.key }] },
				{ match: n => Element.isElement(n) && n.type === 'placeholder' }
			);

			return;
		}

		if (!e.ctrlKey) return;

		switch (e.key) {
			case '`':
				// Prevent the "`" from being inserted by default.
				e.preventDefault();

				// Determine whether any of the currently selected blocks are code blocks.
				const [matchCode] = Editor.nodes(editor, {
					match: n => Element.isElement(n) && n.type === 'code',
				});

				const currentBlockIsCode = typeof matchCode !== 'undefined';

				// Otherwise, set the currently selected blocks type to "code".
				Transforms.setNodes(
					editor,
					{ type: currentBlockIsCode ? 'paragraph' : 'code' },
					{ match: n => Editor.isBlock(editor, n) }
				);
				break;
			case 'b':
				e.preventDefault();

				const [matchBold] = Editor.nodes(editor, {
					match: n => Text.isText(n) && Boolean(n.bold),
				});

				const currentBlockIsBold = typeof matchBold !== 'undefined';

				Transforms.setNodes(editor, { bold: !currentBlockIsBold }, { match: n => Text.isText(n), split: true });
				break;
		}
	};

	return {
		value,
		editor,
		onKeyDown,
		renderElement,
		onChange,
	};
}
