/// <reference types="react" />
import * as React from 'react';
import { IAgrementProps } from './IAgrementProps';
import { IAgreement } from "../../../dataprovider/contentDataProvider";
export interface IAgrementState {
    originalitems: IAgreement[];
}
export default class Agrement extends React.Component<IAgrementProps, IAgrementState> {
    constructor(props: IAgrementProps);
    private viewFields;
    componentDidMount(): void;
    private generateBoxes(nrofboxes);
    private generateList();
    render(): React.ReactElement<IAgrementProps>;
}
