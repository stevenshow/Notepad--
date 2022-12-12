import React from 'react';
import { RenderElementProps } from 'slate-react';

export default function CodeBlock(props: RenderElementProps) {
	return (
		<pre {...props.attributes} className="overflow-x-scroll ">
			<code>{props.children}</code>
		</pre>
	);
}
