import * as React from 'react';
import {Dropdown, DropdownMenuItemType} from "office-ui-fabric-react/lib/Dropdown";
import styles from "./Footer.module.scss";
import {IFooterProps} from  "./IFooterProps";


import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export class Footer extends React.Component<IFooterProps, {}> {
    constructor(props: IFooterProps) {
        super(props);
    }

    private _getCountryData(clientContext): Promise<any> {
        return clientContext.spHttpClient.get(
            clientContext.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Countries')/items`,
                SPHttpClient.configurations.v1
        ).then((response?: any) => {
            return response.json();
        });
    }

    public render(): JSX.Element {
        let countries = [];

        this._getCountryData(this.props.context).then((data: any) => {
            for (let i = 0; i < data.value.length; i++) {
                countries.push({key:data.value[i].Id, text:data.value[i].Title});
                
            }
        });

        return (
            <div className={styles.footer}>
               <div className={styles.main}>
                    {
                        <Dropdown
                        placeholder="Select an Option"
                        label="Required dropdown example:"
                        options={countries}
                      />
                    }
                </div>
            </div>
        )
    }
}

