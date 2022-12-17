/* eslint-disable no-param-reassign */
import { CustomText, Descendant, Editor, Element, Node, Path, Text, Transforms } from 'slate';

export default function EnterKeyPlugin(editor: Editor): Editor {
	const { insertBreak, normalizeNode } = editor;

	editor.insertSoftBreak = () => {
		Transforms.insertText(editor, '\n');
	};

	editor.insertBreak = () => {
		// This logic is also used in hotkey.ts, we should extract it
		const [blockIsCode] = Editor.nodes(editor, {
			match: n => Element.isElement(n) && n.type === 'code',
		});

		if (blockIsCode) {
			editor.insertSoftBreak();
			return;
		}

		insertBreak();
	};

	// This code is meant to turn all inline-code elements into not that
	// when inside a code block element. It also does not belong in this
	// plugin file and also does not work.

	// editor.normalizeNode = entry => {
	// 	const [node, path] = entry;

	// 	const setLeafNodeIsCode = (leafNode: CustomText, leafPath: Path) => {
	// 		const nodeMinusText: any = { ...leafNode };
	// 		delete nodeMinusText.text;

	// 		editor.apply({
	// 			type: 'set_node',
	// 			path: leafPath,
	// 			properties: { text: leafNode.text },
	// 			newProperties: { ...nodeMinusText, attributes: { ...(leafNode.attributes ?? {}), code: false } },
	// 		});
	// 	};

	// 	if (Text.isText(node) && node.attributes?.code) {
	// 		const [parentBlockIsCode] = Editor.nodes(editor, {
	// 			at: { path, offset: 0 },
	// 			match: n => Element.isElement(n) && n.type === 'code',
	// 		});

	// 		if (parentBlockIsCode) {
	// 			setLeafNodeIsCode(node, path);
	// 		}
	// 	} else if (Element.isElement(node) && node.type === 'code' && node.children?.length) {
	// 		for (let i = 0; i < node.children.length; ++i) {
	// 			const childPath = [...path, i];
	// 			const child = node.children[i] as Descendant;
	// 			if (Text.isText(child) && child.attributes?.code) {
	// 				setLeafNodeIsCode(child, childPath);
	// 			}
	// 		}
	// 	}

	// 	normalizeNode(entry);
	// };

	return editor;
}
