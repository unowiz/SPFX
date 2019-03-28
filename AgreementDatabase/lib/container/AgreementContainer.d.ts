/// <reference types="react" />
import * as React from 'react';
import { IAgreementDataProvider } from "../interface/IAgreementDataProvider";
import Agreement from "./Agreement";
import Views from "./Views";
export interface IAgreementContainerProps {
    provider: IAgreementDataProvider;
}
export interface IAgreementContainerState {
    agreements: Agreement[];
    views: Views[];
}
export default class AgreementContainer extends React.Component<IAgreementContainerProps, IAgreementContainerState> {
    constructor(props: IAgreementContainerProps);
    private viewFields;
    componentDidMount(): void;
    render(): JSX.Element;
}
