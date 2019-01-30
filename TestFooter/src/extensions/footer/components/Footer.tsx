import * as React from 'react';
import { Dropdown, DropdownMenuItemType } from "office-ui-fabric-react/lib/Dropdown";
import { BaseComponent } from "office-ui-fabric-react/lib/Utilities";
import styles from './Footer.module.scss';
import { ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';

export class Footer extends BaseComponent<{},{}> {
    constructor(props: {}) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className={styles.footer}>
                <div className={styles.main}>
                
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                                <p>Other text</p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                <Dropdown
                                    responsiveMode={ResponsiveMode.large}
                                    placeHolder="select a option"
                                    options={[
                                        { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
                                        { key: 'A', text: 'Option a', title: 'I am option a.' },
                                        { key: 'B', text: 'Option b' },
                                        { key: 'C', text: 'Option c' },
                                        { key: 'D', text: 'Option d' },
                                        { key: 'E', text: 'Option e' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/* const footer = (props) => {
    return (
        <div className={styles.footer}>
            <div className={styles.main}>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                            <p>Other text</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                            <Dropdown
                                responsiveMode={ResponsiveMode.large}
                                placeHolder="select a option"
                                options={[
                                    { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
                                    { key: 'A', text: 'Option a', title: 'I am option a.' },
                                    { key: 'B', text: 'Option b' },
                                    { key: 'C', text: 'Option c' },
                                    { key: 'D', text: 'Option d' },
                                    { key: 'E', text: 'Option e' }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} */

// export default footer;