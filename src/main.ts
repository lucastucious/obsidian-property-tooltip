import {  Plugin } from 'obsidian';
import {
    DEFAULT_SETTINGS,
    PropertyTipSettings,
    PropertyTipSettingTab,
} from "settings/Settings";


export default class PropertyTip extends Plugin {
	public settings: PropertyTipSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new PropertyTipSettingTab(this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}



