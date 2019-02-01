/**
 * Class used for representing the user selected widgets from the local and the global store.
 */
export class DividerWidgetsSetting {
    /**
     * Array containing the ids for the widgets selected by the user from the users local widget store.
     */
    public l:string[];

    /**
     * Array containing the ids for the widgets selected by the user from the global widget store.
     */
    public g:string[];
}

/**
 * Class representing the Schema extension added to the user in MS Graph.
 */
export class UserSettings {
    public ClosedAlertIds: string;
    public DividerWidgets: DividerWidgetsSetting;

    /**
     * Override how this class is JSON stringified in order to match the data contract in the Graph extension (the properties should be strings).
     */
    public toJSON() {
        if (this.ClosedAlertIds) {
            if (this.DividerWidgets) {
                return `{"ClosedAlertIds": "${JSON.stringify(this.ClosedAlertIds)}, "DividerWidgets": "${JSON.stringify(this.DividerWidgets)}"}`;
            }

            return `{"ClosedAlertIds": "${JSON.stringify(this.ClosedAlertIds)}}`;
        }
        
        if (this.DividerWidgets) {
            return {"DividerWidgets": JSON.stringify(this.DividerWidgets)};
        }

        return "{}";
    }

    public fromJSON(item) {
        alert('teset');
        let result = {};
        if (item.ClosedAlertIds) {
            result["ClosedAlertIds"] = JSON.parse(item.ClosedAlertIds);
        }
        
        if (item.DividerWidgets) {
            result["DividerWidgets"] = JSON.parse(item.DividerWidgets);
        }

        return result;
    }
}