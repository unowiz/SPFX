/// <reference types="react" />
import * as React from 'react';
import { IBannerProps } from './IBannerProps';
export default class Banner extends React.Component<IBannerProps, {}> {
    private _scrollElm;
    private _scrollElmRect;
    private _parallaxElm;
    /**
     * Opens the property pane for configuration
     */
    private _onConfigure;
    /**
     * Finds the scrollable parent
     */
    private _getScrollableParent();
    /**
     * Set translate / parallax effect
     * @param vector
     */
    private _setTranslate(vector);
    /**
     * Set the parallax effect to the banner image element
     */
    private _setParallaxEffect;
    private _removeParallaxBinding();
    /**
     * Add or remove parallax binding to the banner
     */
    private _parallaxBinding();
    /**
     * Bind the parallax effect on mount
     */
    componentDidMount(): void;
    /**
     * Bind the parallax effect on update
     * @param prevProps
     */
    componentDidUpdate(prevProps: IBannerProps): void;
    /**
     * Unbind the parallax effect
     */
    componentWillUnmount(): void;
    render(): React.ReactElement<IBannerProps>;
}
