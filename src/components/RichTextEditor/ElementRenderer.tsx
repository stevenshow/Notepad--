import React, { useMemo } from 'react';
import clsx from 'clsx';
import { DefaultElement, RenderElementProps } from 'slate-react';
import { RenderElement } from '.';
import CodeBlock from './content-blocks/CodeBlock';
import ListBlock from './content-blocks/ListBlock';
import MediaBlock from './content-blocks/MediaBlock';
import PlainTextBlock from './content-blocks/PlainTextBlock';
import TableBlock from './content-blocks/TableBlock';

export default function ElementRenderer(props: RenderElementProps) {
	const { fontFamily, type } = props.element;

	const Renderer = useMemo<RenderElement>(() => {
		switch (type) {
			case 'paragraph':
				return PlainTextBlock;
			case 'list':
				return ListBlock;
			case 'code':
				return CodeBlock;
			case 'table':
				return TableBlock;
			case 'media':
				return MediaBlock;
			default:
				return DefaultElement;
		}
	}, [type]);

	return (
		<div
			className={clsx('element-renderer', `my-2 rounded-md p-2 transition-colors hover:bg-gray-100`, {
				'bg-gray-100': type === 'code',
				'font-sans': fontFamily === 'sans',
				'font-serif': fontFamily === 'serif',
				'font-mono': fontFamily === 'mono',
			})}
		>
			<Renderer {...props} />
		</div>
	);
}
