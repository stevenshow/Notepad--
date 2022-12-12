import React from 'react';
import { Editor } from 'slate';
import { Hotkey } from 'model/Hotkeys';

export interface EditorWithHotkey extends Editor {
	registerHotkey: (hotkey: Hotkey) => VoidFunction;
	deregisterHotkey: (args: DeregisterHotkeyArgs) => void;
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
	return Object.assign(editor, {
		registerHotkey: hotkeyController.registerHotkey,
		deregisterHotkey: hotkeyController.deregisterHotkey,
		onKeyDown: event => hotkeyController.onKeyDown(event, editor),
	});
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

	/**
	 * Registers a new hotkey to be triggered in the `onKeyDown()`
	 * function. Returns a function that deregisters the hotkey when
	 * called.
	 */
	registerHotkey(hotkey: Hotkey) {
		if (this.hasHotkey(hotkey)) {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			return () => {};
		}

		this.hotkeys.push(hotkey);
		return () => this.deregisterHotkey({ hotkey });
	}

	/**
	 * Removes the hotkey (or hotkey with the given hotkeyId) from the
	 * list of active hotkeys.
	 */
	deregisterHotkey({ hotkey, hotkeyId }: DeregisterHotkeyArgs) {
		const idx = this.hotkeyIndex(hotkey, hotkeyId);
		if (idx !== -1) {
			this.hotkeys.splice(idx, 1);
		}
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
