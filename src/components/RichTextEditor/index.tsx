import { RenderElementProps, RenderLeafProps } from 'slate-react';
import RichTextEditor from './RichTextEditor';

export default RichTextEditor;
export * from './RichTextEditor';

export type RenderElement = (props: RenderElementProps) => JSX.Element;
export type RenderLeaf = (props: RenderLeafProps) => JSX.Element;
