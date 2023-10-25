import {
	Plugin,
	MarkdownRenderer,
	MarkdownRenderChild
} from 'obsidian';
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
		console.log('loaded');

		this.registerMarkdownPostProcessor((element, context) => {
			console.log('register');
			this.app.workspace.onLayoutReady(() => {
				
				console.log('layoutReady', this.app.workspace.getLeafById("workspace-leaf-content"))
			});
			let file = this.app.workspace.getActiveFile();
			//this.registerView('Property',this.app.workspace.containerEl)
			console.log(this.app.workspace.containerEl);
			this

			
		});

		this.registerEvent(this.app.metadataCache.on('resolved', this.onMetadataChange.bind(this)));

	// Render on file change
	
		this.registerMarkdownCodeBlockProcessor('codeblockId', (sourceText, element, context) => {
			console.log('register code');
			context.addChild(new Renderer(this.app, element, context, context.sourcePath, sourceText));
		});

	}
	onMetadataChange() {
		console.log('metadata');
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

class Renderer extends MarkdownRenderChild {
	constructor(app, element, context, sourcePath, sourceText) {
		super(element)
		this.app = app
		this.element = element
		this.sourcePath = sourcePath
		this.sourceText = sourceText
		console.log('construct')
	}

	onload() {
		console.log('loaded');
		this.render();
		this.registerEvent(this.app.metadataCache.on('changed', this.onMetadataChange.bind(this)));
	}

	// Render on file change
	onMetadataChange() {
		this.render();
	}
	render() {
		console.log('render ?');
	}

}
