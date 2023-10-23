import {
	ButtonComponent,
	PluginSettingTab,
	Setting
} from "obsidian";
import PropertyTip from "main";
import { log } from "console";


export interface TooltipMap {
	property: string;
	tooltip: string;
}

export interface PropertyTipSettings {
	propertiesTips: Array < TooltipMap > ;
}
export const DEFAULT_SETTINGS: PropertyTipSettings = {
	propertiesTips: [{
		property: "",
		tooltip: ""
	}],
};

function arraymove<T>(
    arr: T[],
    fromIndex: number,
    toIndex: number
): void {
    if (toIndex < 0 || toIndex === arr.length) {
        return;
    }
    const element = arr[fromIndex];
    arr[fromIndex] = arr[toIndex];
    arr[toIndex] = element;
}

export class PropertyTipSettingTab extends PluginSettingTab {

    constructor(private plugin: PropertyTip) {
        super(app, plugin);
    }

    display(): void {

        this.containerEl.empty();

        new Setting(this.containerEl)
            .setName('Properties Tooltips')
            .setDesc("Add new tooltip for a property")
            .addButton((button: ButtonComponent) => {
                button
                    .setTooltip("Add additional folder template")
                    .setButtonText("+")
                    .setCta()
                    .onClick(() => {
                        this.plugin.settings.propertiesTips.push({
                            property: "",
                            tooltip: "",
                        });
                        this.plugin.saveSettings();
                        this.display();
                    });
            });
        this.plugin.settings.propertiesTips.forEach(
            (propertytip, index) => {
                const s = new Setting(this.containerEl)
                    .addText(row => row
                        .setPlaceholder("property")
                        .setValue(propertytip.property)
                        .onChange((new_property) => {
                            if (
                                new_property &&
                                this.plugin.settings.propertiesTips.some(
                                    (e) => e.property == new_property
                                )
                            ) {
                                log("This property is already tooltiped")
                                return;
                            }
                            this.plugin.settings.propertiesTips[
                                index
                            ].property = new_property;
                            this.plugin.saveSettings();
                        })
                        
                )
                .addText(row => row
                    .setPlaceholder("tip")
                    .setValue(propertytip.tooltip)
                    .onChange((new_tooltip) => {
                        this.plugin.settings.propertiesTips[
                            index
                        ].tooltip = new_tooltip;
                        this.plugin.saveSettings();
                    })
                    
            )
                    .addExtraButton((cb) => {
                        cb.setIcon("up-chevron-glyph")
                            .setTooltip("Move up")
                            .onClick(() => {
                                arraymove(
                                    this.plugin.settings.propertiesTips,
                                    index,
                                    index - 1
                                );
                                this.plugin.saveSettings();
                                this.display();
                            });
                    })
                    .addExtraButton((cb) => {
                        cb.setIcon("down-chevron-glyph")
                            .setTooltip("Move down")
                            .onClick(() => {
                                arraymove(
                                    this.plugin.settings.propertiesTips,
                                    index,
                                    index + 1
                                );
                                this.plugin.saveSettings();
                                this.display();
                            });
                    })
                    .addExtraButton((cb) => {
                        cb.setIcon("cross")
                            .setTooltip("Delete")
                            .onClick(() => {
                                this.plugin.settings.propertiesTips.splice(
                                    index,
                                    1
                                );
                                this.plugin.saveSettings();
                                this.display();
                            });
                    });
                s.infoEl.remove();
            }
        );
    }
}
