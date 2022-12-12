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

const LoremIpsumText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor morbi non arcu risus. Sit amet commodo nulla facilisi nullam vehicula. Suspendisse potenti nullam ac tortor vitae purus. Viverra orci sagittis eu volutpat odio facilisis mauris. Nibh praesent tristique magna sit. Dolor sed viverra ipsum nunc aliquet bibendum enim. Amet justo donec enim diam vulputate ut pharetra sit. Enim ut sem viverra aliquet eget sit amet. Mauris pharetra et ultrices neque. Cum sociis natoque penatibus et magnis dis parturient montes. Sit amet volutpat consequat mauris nunc congue nisi vitae. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Nulla pharetra diam sit amet nisl. Lobortis elementum nibh tellus molestie nunc.';

export const Default = Template.bind({});

Default.args = {
	value: [{ type: 'paragraph', children: [{ text: '' }] }],
};

export const LoremIpsum = Template.bind({});

LoremIpsum.args = {
	value: [{ type: 'paragraph', children: [{ text: LoremIpsumText }] }],
};
