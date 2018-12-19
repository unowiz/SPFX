import * as React from 'react';
import styles from './GraphPersona.module.scss';
import { IGraphPersonaProps } from './IGraphPersonaProps';
import { IGraphPersonaState } from "./IGraphPersonaState";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { MSGraphClient } from "@microsoft/sp-http";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

//Fabric persona
import { 
  Persona,
  PersonaSize
 } from "office-ui-fabric-react/lib/Persona";
 import { Link } from "office-ui-fabric-react/lib/Link";

 

export default class GraphPersona extends React.Component<IGraphPersonaProps, IGraphPersonaState> {
  constructor(props: IGraphPersonaProps, state: IGraphPersonaState) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      image: ''
    };
  }

  public componentDidMount(): void {
    this.props.graphClient
      .api('me')
      .get((error: any, user: MicrosoftGraph.User, rawResponse: any) => {
        this.setState({
          name: user.displayName,
          email: user.mail,
          phone: user.businessPhones[0]
        });
      });
    
    this.props.graphClient
      .api('me/photo/$value')
      .responseType('blob')
      .get((err: any, photoResponse: any, rawResponse: any) => {
        const bolbUrl = window.URL.createObjectURL(photoResponse);
        this.setState({image: bolbUrl});
      });
  }

  private _renderMail = () => {
    if (this.state.email) {
      return <Link href={`mailto:${this.state.email}`}>{this.state.email}</Link>;
    } else {
      return <div />
    }
  }

  private _renderPhone = () => {
    if (this.state.email) {
      return <Link href={`tel:${this.state.phone}`}>{this.state.phone}</Link>;
    } else {
      return <div />
    }
  }


  public render(): React.ReactElement<IGraphPersonaProps> {
    return (
      <div>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.fUpdateProperty}
        />
        <Persona primaryText={this.state.name}
          secondaryText={this.state.email}
          onRenderSecondaryText={this._renderMail}
          tertiaryText={this.state.phone}
          onRenderTertiaryText={this._renderPhone}
          imageUrl={this.state.image}
          size={PersonaSize.size100} />
      </div>
    );
  }
}
