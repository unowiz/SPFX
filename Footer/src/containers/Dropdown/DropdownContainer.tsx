import * as React from 'react';
import { Dropdown, DropdownMenuItemType } from "office-ui-fabric-react/lib/Dropdown";

export default class Footer extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <Dropdown
                placeholder="Select an Option"
                label="Required dropdown example:"
                options={[
                    { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
                    { key: 'A', text: 'Option a', title: 'I am option a.' },
                    { key: 'B', text: 'Option b' },
                    { key: 'C', text: 'Option c', disabled: true },
                    { key: 'D', text: 'Option d' },
                    { key: 'E', text: 'Option e' }
                ]}
                required={true}
            />
        )
    }
}