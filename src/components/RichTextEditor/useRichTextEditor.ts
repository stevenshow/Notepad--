import React, { useRef } from 'react';
import withPlugins from 'plugins';
import { CustomElement, Editor, Element, Text, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { RichTextEditorProps } from './RichTextEditor';

const EMPTY_BLOCK: CustomElement = { type: 'paragraph', children: [{ text: '' }] };

export default function useRichTextEditor({ value, onChange }: RichTextEditorProps) {
	const editorRef = useRef(withReact(withPlugins(withHistory(createEditor()))));
	const editor = editorRef.current;

	if (value.length === 0) {
		value.push(EMPTY_BLOCK);
		onChange?.(value);
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		// For the hotkey plugin
		editor.onKeyDown(e);

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
					match: n => Text.isText(n) && Boolean(n.attributes?.bold),
				});

				const currentBlockIsBold = typeof matchBold !== 'undefined';

				Transforms.setNodes(
					editor,
					{ attributes: { bold: !currentBlockIsBold } },
					{ match: n => Text.isText(n), split: true }
				);
				break;
		}
	};

	return {
		value,
		editor,
		onKeyDown,
		onChange,
	};
}
