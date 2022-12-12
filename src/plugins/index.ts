import { Editor } from 'slate';
import HotkeyPlugin from './HotkeyPlugin';

// ========================================================================
// When adding a plugin to this file, add the plugin function to the
// list of plugin functions in withPlugins(), and update the ExtendedEditor
// type above with "& ReturnType<typeof pluginfunctionname>"
// ========================================================================

type PluginFn = (editor: Editor) => Editor;
type ExtendedEditor = Editor & ReturnType<typeof HotkeyPlugin>;

/**
 * Extend the Editor with the plugins defined in the `plugins/`
 * directory. See `index.ts` for instructions on how to add plugins,
 * as well as https://docs.slatejs.org/concepts/08-plugins.
 */
export default function withPlugins(editor: Editor) {
	const plugins: PluginFn[] = [HotkeyPlugin];

	let editorWithPlugins = editor;

	for (const plugin of plugins) {
		editorWithPlugins = plugin(editorWithPlugins);
	}

	return editorWithPlugins as ExtendedEditor;
}
