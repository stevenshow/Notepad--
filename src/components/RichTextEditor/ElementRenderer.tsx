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
	const Renderer = useMemo<RenderElement>(() => {
		switch (props.element.type) {
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
	}, [props.element.type]);

	return (
		<div
			className={clsx(
				`my-2 rounded-md p-2 transition-colors focus-within:bg-gray-100 hover:bg-gray-100`,
				props.element.fontFamily && `font-${props.element.fontFamily}`,
				{
					'bg-gray-100': props.element.type === 'code',
				}
			)}
		>
			<Renderer {...props} />
		</div>
	);
}
