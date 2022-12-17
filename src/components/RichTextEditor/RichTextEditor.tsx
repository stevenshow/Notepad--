import React from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';
import ElementRenderer from './ElementRenderer';
import LeafRenderer from './LeafRenderer';
import useRichTextEditor from './useRichTextEditor';

export interface RichTextEditorProps {
	value: Descendant[];
	onChange?: (val: Descendant[]) => void;
}

export default function RichTextEditor(props: RichTextEditorProps) {
	const { editor, value, onChange, onKeyDown } = useRichTextEditor(props);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// window.editor = editor;

	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			<Editable
				// Made these a callback instead of `renderElement={ElementRenderer}`
				// because otherwise, changes made to them won't be hot-reloaded
				renderElement={p => <ElementRenderer {...p} />}
				renderLeaf={p => <LeafRenderer {...p} />}
				onKeyDown={onKeyDown}
				autoFocus
			/>
		</Slate>
	);
}
