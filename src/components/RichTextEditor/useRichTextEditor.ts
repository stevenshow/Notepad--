import React, { useEffect, useRef } from 'react';
import { CustomElement, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import hotkeys from 'model/Hotkeys';
import withPlugins from 'plugins';
import { RichTextEditorProps } from './RichTextEditor';

const EMPTY_BLOCK: CustomElement = { type: 'paragraph', children: [{ text: '' }] };

export default function useRichTextEditor({ value, onChange }: RichTextEditorProps) {
	const editor = useNewEditor();

	if (value.length === 0) {
		value.push(EMPTY_BLOCK);
		onChange?.(value);
	}

	// Register hotkeys
	useEffect(() => {
		const offFunctions: VoidFunction[] = [];
		for (const hk of hotkeys) {
			offFunctions.push(editor.registerHotkey(hk));
		}
		return () => offFunctions.forEach(fn => fn());
	}, []);

	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		// For the hotkey plugin
		editor.onKeyDown(e);
	};

	return {
		value,
		editor,
		onKeyDown,
		onChange,
	};
}

function useNewEditor() {
	const createEditorWithPlugins = () => withPlugins(withReact(withHistory(createEditor())));

	const editorRef = useRef<ReturnType<typeof createEditorWithPlugins>>();
	if (!editorRef.current) editorRef.current = createEditorWithPlugins();
	return editorRef.current;
}
