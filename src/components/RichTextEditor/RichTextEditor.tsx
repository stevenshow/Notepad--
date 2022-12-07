import React from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';
import LeafRenderer from './LeafRenderer';
import useRichTextEditor from './useRichTextEditor';

export interface RichTextEditorProps {
	value: Descendant[];
	onChange?: (val: Descendant[]) => void;
}

export default function RichTextEditor(props: RichTextEditorProps) {
	const { editor, value, onChange, onKeyDown, renderElement } = useRichTextEditor(props);

	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			<Editable renderElement={renderElement} renderLeaf={LeafRenderer} onKeyDown={onKeyDown} />
		</Slate>
	);
}
