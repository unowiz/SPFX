import * as React from 'react';
import styles from './ReactCustompropertypanecontrol.module.scss';
import { IReactCustompropertypanecontrolProps } from './IReactCustompropertypanecontrolProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactCustompropertypanecontrol extends React.Component<IReactCustompropertypanecontrolProps, {}> {
  public render(): React.ReactElement<IReactCustompropertypanecontrolProps> {
    return (
      <div className={ styles.reactCustompropertypanecontrol }>
        <div className={ styles.container }>
        <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
           <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
             <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
             <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using web parts.</p>
             <p className="ms-font-l ms-fontColor-white">{escape(this.props.listName)}</p>
             <p className="ms-font-l ms-fontColor-white">{escape(this.props.item)}</p>
             <a href="https://aka.ms/spfx" className={styles.button}>
               <span className={styles.label}>Learn more</span>
             </a>
           </div>
         </div>
        </div>
      </div>
    );
  }
}
