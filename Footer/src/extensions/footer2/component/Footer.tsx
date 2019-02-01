import * as React from 'react';
import style from './Footer.module.scss';
import DropdownContainer from "../../../containers/DropDown/DropdownContainer";

export default class Footer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<any> {
        return (
            <div className={style.footer}>
                <div className={style.main}>
                    {
                        <DropdownContainer />
                    }
                </div>
            </div>

        )
    }
}