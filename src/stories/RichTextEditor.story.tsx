import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RichTextEditor, { RichTextEditorProps } from '../components/RichTextEditor';

export default {
	/* 👇
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'RichTextEditor',
	component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>;

const Template: ComponentStory<typeof RichTextEditor> = (props: RichTextEditorProps) => <RichTextEditor {...props} />;

export const Default = Template.bind({});

Default.args = {};
