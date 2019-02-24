/// <reference types="react" />
import * as React from 'react';
import { IPagingProps } from "./IPagingProps";
import { IPagingState } from "./IPagingState";
export declare class Paging extends React.Component<IPagingProps, IPagingState> {
    constructor(props: IPagingProps);
    /**
     * Load the previous page
     */
    private _prevPage;
    /**
     * Load the previous page
     */
    private _nextPage;
    /**
     * Triggers the update function with the new batch of items
     */
    private _triggerUpdate;
    /**
     * componentWillReceiveProps lifecycle hook
     * @param nextProps
     */
    componentWillReceiveProps(nextProps: IPagingProps): void;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IPagingProps>;
}
