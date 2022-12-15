import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

declare module 'slate' {
	type CustomElementType = 'paragraph' | 'code' | 'list' | 'table' | 'media';
	export type FontSize = 'h1' | 'h2' | 'h3' | 'h4' | 'XL' | 'L' | 'M' | 'S' | 'XS';
	export type FontFamilyType = 'sans' | 'serif' | 'mono';
	export type ListSymbol =
		| 'alpha-cap'
		| 'alpha'
		| 'roman-cap'
		| 'roman'
		| 'dash'
		| 'bullet'
		| 'numeric'
		| 'checklist';

	interface TextLink {
		url?: string;
	}

	interface ElementListItem {
		checked?: boolean;
		symbol?: ListSymbol;
		indent?: number;
	}

	interface TextAttributes {
		bold?: boolean;
		italic?: boolean;
		underline?: boolean;
		strikethrough?: boolean;
		size?: FontSize;
		color?: string;
		code?: boolean; // inline code
	}

	// CustomText is rendered by the LeafRenderer
	interface CustomText {
		text: string;
		attributes?: TextAttributes;
		link?: TextLink;
	}

	interface ElementMediaProperties {
		file?: string;
		url?: string;
		caption?: string;
	}

	// CustomElement is rendered by the content-block
	interface CustomElement {
		type: CustomElementType;
		children: CustomText[] | CustomElement[];
		list?: ElementListItem;
		media?: ElementMediaProperties;

		// https://tailwindcss.com/docs/font-family
		fontFamily?: FontFamilyType;
	}

	export interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
