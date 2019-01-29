import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './Footer.module.scss';

export default class footer extends React.Component<any> {
    public render(): React.ReactElement<any> {
        return (
            <div className={styles.footer}>
                <div className={styles.main}>
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                                <p>other</p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                <p>DropDown</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        )
    }
}