import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

declare module 'slate' {
	export interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
	}

	export interface BaseElement {
		type: string;
	}
}
