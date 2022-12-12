import React from 'react';
import clsx from 'clsx';
import { DefaultElement, RenderElementProps } from 'slate-react';
import { RenderElement } from '.';
import CodeBlock from './content-blocks/CodeBlock';
import ListBlock from './content-blocks/ListBlock';
import MediaBlock from './content-blocks/MediaBlock';
import PlainTextBlock from './content-blocks/PlainTextBlock';
import TableBlock from './content-blocks/TableBlock';

export default function ElementRenderer(props: RenderElementProps) {
	let Renderer: RenderElement;
	switch (props.element.type) {
		case 'paragraph':
			Renderer = PlainTextBlock;
			break;
		case 'list':
			Renderer = ListBlock;
			break;
		case 'code':
			Renderer = CodeBlock;
			break;
		case 'table':
			Renderer = TableBlock;
			break;
		case 'media':
			Renderer = MediaBlock;
			break;
		default:
			Renderer = DefaultElement;
			break;
	}

	return (
		<div
			className={clsx('my-2 rounded-md p-2 transition-colors hover:bg-gray-100', {
				'bg-gray-100': props.element.type === 'code',
			})}
		>
			<Renderer {...props} />
		</div>
	);
}
