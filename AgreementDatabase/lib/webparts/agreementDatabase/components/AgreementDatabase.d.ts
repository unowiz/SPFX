/// <reference types="react" />
import * as React from 'react';
import { IAgreementDatabaseProps } from './IAgreementDatabaseProps';
import { IList } from "../../../dataprovider/ContentDataProvider";
import { IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
export interface IListState {
    filteredListItems: IList[];
    originalitems: IList[];
    groupByFields: IGrouping[];
    filter: boolean;
}
export default class AgreementDatabase extends React.Component<IAgreementDatabaseProps, IListState> {
    constructor(props: IAgreementDatabaseProps);
    componentDidMount(): void;
    private _viewFields;
    render(): React.ReactElement<IAgreementDatabaseProps>;
    private generateBoxes(nrofboxes);
    private _handleRequest(request);
    private _renderList();
    private getMyAgreement();
    private getEnded();
    private getPassed();
    private groupHandler(group);
}
