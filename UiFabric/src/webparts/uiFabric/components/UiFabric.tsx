import * as React from 'react';
import styles from './UiFabric.module.scss';
import { IUiFabricProps } from './IUiFabricProps';
import { IUiFabricState } from "./IUiFabricState";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IButtonProps, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { escape } from '@microsoft/sp-lodash-subset';

export default class UiFabric extends React.Component<IUiFabricProps, IUiFabricState> {
  constructor(props: IUiFabricProps, state: IUiFabricState) {
    super(props);

    this.state = ({
      userName : ''
    });
  }


  public render(): JSX.Element {
    return (
      <div className={ styles.uiFabric }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <TextField 
                required={true}
                name="textUserName"
                placeholder="Your name please"
                value={this.state.userName}
                onChanged={e => this.setState({userName: e})}
              />
              <DefaultButton
                data-automation-id="greet"
                target="_blank"
                title = "Greet the user"
                onClick={this._greetClicked} />
                
              

              <p>{this.state.userName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _greetClicked(): void {
    alert('Hello ' + this.state.userName);
  }
}
