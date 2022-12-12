import React from 'react';
import { Editor } from 'slate';

type HotkeyModifier = 'shift' | 'alt' | 'ctrl' | 'meta';

export interface Hotkey {
	id?: string;
	key: string;
	modifiers: HotkeyModifier[];
	action: (editor: Editor, e: KeyEvent) => any;
}

export interface EditorWithHotkey extends Editor {
	registerHotkey: (hotkey: Hotkey) => boolean;
	deregisterHotkey: (args: DeregisterHotkeyArgs) => boolean;
	onKeyDown: (event: KeyEvent) => void;
}

/**
 * This plugin is meant to handle any custom hotkeys we decide to
 * implement. In order for hotkeys to be triggered, the `editor.onKeyDown(...)`
 * function must be attached to the `onKeyDown` event.
 *
 * To add a hotkey, use `editor.registerHotkey(...)`. To remove
 * a hotkey, use `editor.deregisterHotkey(...)`.
 */
export default function HotkeyPlugin(editor: Editor): EditorWithHotkey {
	const hotkeyController = new HotkeyController();
	return {
		...editor,
		registerHotkey: hotkeyController.registerHotkey,
		deregisterHotkey: hotkeyController.deregisterHotkey,
		onKeyDown: event => hotkeyController.onKeyDown(event, editor),
	};
}

class HotkeyController implements Pick<EditorWithHotkey, 'registerHotkey' | 'deregisterHotkey'> {
	hotkeys: Hotkey[];

	constructor() {
		this.hotkeys = [];
		this.registerHotkey = this.registerHotkey.bind(this);
		this.deregisterHotkey = this.deregisterHotkey.bind(this);
	}

	onKeyDown(e: KeyEvent, editor: Editor) {
		for (const hotkey of this.hotkeys) {
			if (this.isPressingHotkey(hotkey, e)) {
				hotkey.action(editor, e);
			}
		}
	}

	registerHotkey(hotkey: Hotkey): boolean {
		if (this.hasHotkey(hotkey)) {
			return false;
		}

		this.hotkeys.push(hotkey);
		return true;
	}

	deregisterHotkey({ hotkey, hotkeyId }: DeregisterHotkeyArgs): boolean {
		const idx = this.hotkeyIndex(hotkey, hotkeyId);
		if (idx !== -1) {
			this.hotkeys.splice(idx, 1);
			return true;
		}

		return false;
	}

	private hasHotkey(hotkey: Hotkey) {
		return this.hotkeyIndex(hotkey) !== -1;
	}

	private hotkeyIndex(hotkey?: Hotkey, hotkeyId?: string) {
		if (!hotkey && !hotkeyId) return -1;

		if (hotkey && this.hotkeys.includes(hotkey)) {
			return this.hotkeys.indexOf(hotkey);
		}

		if (hotkey?.id || hotkeyId) {
			return this.hotkeys.findIndex(h => (!!hotkey?.id && h.id === hotkey?.id) || h.id === hotkeyId);
		}

		return -1;
	}

	private isPressingHotkey(hotkey: Hotkey, e: KeyEvent): boolean {
		if (hotkey.key.toLowerCase() !== e.key.toLowerCase()) return false;
		if (hotkey.modifiers.includes('alt') && !e.altKey) return false;
		if (hotkey.modifiers.includes('ctrl') && !e.ctrlKey) return false;
		if (hotkey.modifiers.includes('shift') && !e.shiftKey) return false;
		if (hotkey.modifiers.includes('meta') && !e.metaKey) return false;
		return true;
	}
}

interface DeregisterHotkeyArgs {
	hotkey?: Hotkey;
	hotkeyId?: string;
}

type KeyEvent = React.KeyboardEvent<HTMLElement>;
