import Widget from "./Widget";

export default class WidgetSettingsItem {
    public widget: Widget;
    public selected: boolean;

    constructor(widget: Widget, selected: boolean) {
        this.widget = widget;
        this.selected = selected;
    }
}