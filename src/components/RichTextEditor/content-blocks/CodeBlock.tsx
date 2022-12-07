import React from 'react';
import clsx from 'clsx';
import { RenderElementProps } from 'slate-react';

export default function CodeBlock(props: RenderElementProps) {
	return (
		<pre {...props.attributes} className={clsx()}>
			<code>{props.children}</code>
		</pre>
	);
}
