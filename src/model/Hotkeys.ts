import React from 'react';
import { Editor, Element, FontSize, Range, Text, TextAttributes, Transforms } from 'slate';

export type HotkeyModifier = 'shift' | 'alt' | 'ctrl' | 'meta';

export interface Hotkey {
	id?: string;
	key: string;
	modifiers: HotkeyModifier[];
	action: (editor: Editor, e: React.KeyboardEvent<HTMLElement>) => any;
}

export const hkBold: Hotkey = {
	id: 'bold',
	key: 'b',
	modifiers: ['ctrl'],
	action: (editor, e) => {
		e.preventDefault();
		Transforms.setNodes(
			editor,
			{ attributes: { bold: !selectedTextHasAttributes(editor, { bold: true }) } },
			setNodeOptions
		);
	},
};

export const hkCode: Hotkey = {
	id: 'code',
	key: '`',
	modifiers: ['ctrl'],
	action: (editor, e) => {
		if (!editor.selection) return;
		e.preventDefault();

		const isBlockSelected = Range.isCollapsed(editor.selection);

		if (isBlockSelected) {
			const [blockIsCode] = Editor.nodes(editor, {
				match: n => Element.isElement(n) && n.type === 'code',
			});
			Transforms.setNodes(
				editor,
				{ type: blockIsCode ? 'paragraph' : 'code' },
				{ match: n => Editor.isBlock(editor, n) }
			);
		} else {
			Transforms.setNodes(
				editor,
				{ attributes: { code: !selectedTextHasAttributes(editor, { code: true }) } },
				setNodeOptions
			);
		}
	},
};

export const hkItalics: Hotkey = {
	id: 'italics',
	key: 'i',
	modifiers: ['ctrl'],
	action: (editor, e) => {
		e.preventDefault();
		Transforms.setNodes(
			editor,
			{ attributes: { italic: !selectedTextHasAttributes(editor, { italic: true }) } },
			setNodeOptions
		);
	},
};

export const hkUnderline: Hotkey = {
	id: 'underline',
	key: 'u',
	modifiers: ['ctrl'],
	action: (editor, e) => {
		e.preventDefault();
		Transforms.setNodes(
			editor,
			{ attributes: { underline: !selectedTextHasAttributes(editor, { underline: true }) } },
			setNodeOptions
		);
	},
};

export const hkStrikethrough: Hotkey = {
	id: 'strikethrough',
	key: 's',
	modifiers: ['ctrl', 'alt'],
	action: (editor, e) => {
		e.preventDefault();
		Transforms.setNodes(
			editor,
			{ attributes: { strikethrough: !selectedTextHasAttributes(editor, { strikethrough: true }) } },
			setNodeOptions
		);
	},
};

export const hkIncreaseTextSize: Hotkey = {
	id: 'increase-text-size',
	key: '=', // without the shift key, the "+" is "="
	modifiers: ['ctrl', 'alt'],
	action: (editor, e) => {
		if (editor.selection) {
			const [node] = Editor.node(editor, editor.selection);
			if (Text.isText(node)) {
				e.preventDefault();
				const currentSize = node.attributes?.size ?? 'M';
				if (currentSize === 'XL') return;
				const newSize = textSizes[textSizes.indexOf(currentSize) + 1];
				Transforms.setNodes(editor, { attributes: { size: newSize } }, setNodeOptions);
			}
		}
	},
};

export const hkDecreaseTextSize: Hotkey = {
	id: 'decrease-text-size',
	key: '-',
	modifiers: ['ctrl', 'alt'],
	action: (editor, e) => {
		if (editor.selection) {
			const [node] = Editor.node(editor, editor.selection);
			if (Text.isText(node)) {
				e.preventDefault();
				const currentSize = node.attributes?.size ?? 'M';
				if (currentSize === 'XS') return;
				const newSize = textSizes[textSizes.indexOf(currentSize) - 1];
				Transforms.setNodes(editor, { attributes: { size: newSize } }, setNodeOptions);
			}
		}
	},
};

export default [hkBold, hkCode, hkDecreaseTextSize, hkIncreaseTextSize, hkItalics, hkStrikethrough, hkUnderline];

function selectedTextHasAttributes(editor: Editor, attributes: Partial<TextAttributes>) {
	const [match] = Editor.nodes(editor, {
		match: n => {
			if (!Text.isText(n)) return false;
			return Object.entries(attributes)
				.filter(([, value]) => typeof value !== 'undefined')
				.every(([key, value]) => n.attributes?.[key] === value);
		},
	});
	return !!match;
}

const setNodeOptions: Parameters<typeof Transforms.setNodes>[2] = {
	match: n => Text.isText(n),
	merge: (prev, next) => ({ ...prev, ...next }),
	split: true,
};

const textSizes: FontSize[] = ['XS', 'S', 'M', 'L', 'XL'];
