

/**
 * Class representing the Schema extension added to the user in MS Graph.
 */
export class UserSettings {
    public ClosedAlertIds:number[];
    public QuickLinksWidgets: number[];

    /**
     * Override how this class is JSON stringified in order to match the data contract in the Graph extension (the properties should be strings).
     */
    public toJSON() {
        console.log('custom toJSON');
        if (this.ClosedAlertIds) {
            if (this.QuickLinksWidgets) {
                return `{"ClosedAlertIds": "${JSON.stringify(this.ClosedAlertIds)}, "QuickLinksWidgets": "${JSON.stringify(this.QuickLinksWidgets)}"}`;
            }

            return `{"ClosedAlertIds": "${JSON.stringify(this.ClosedAlertIds)}}`;
        }
        
        if (this.QuickLinksWidgets) {
            return {"QuickLinksWidgets": JSON.stringify(this.QuickLinksWidgets)};
        }

        return "{}";
    }

    public static fromJSON(item) {
        alert('teset');
        let result = {};
        if (item.ClosedAlertIds) {
            result["ClosedAlertIds"] = JSON.parse(item.ClosedAlertIds);
        }
        
        if (item.QuickLinksWidgets) {
            result["QuickLinksWidgets"] = JSON.parse(item.QuickLinksWidgets);
        }

        return result;
    }
}