import * as React from 'react';
import styles from './Events.module.scss';
import { IEventsProps } from './IEventsProps';
import { IEventsState } from "./IEventsState";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { List } from "office-ui-fabric-react/lib/List";
import { format } from "date-fns";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { escape } from '@microsoft/sp-lodash-subset';

export default class Events extends React.Component<IEventsProps, IEventsState> {
  constructor(props: IEventsProps, state: IEventsState) {
    super(props);

    this.state = {
      events: []
    };
  }

  public componentDidMount(): void {
    this.props.graphClient
      .api('me/events')
      .get((error: any, eventsResponse: any, rawResponse: any) => {
        const calendarEvents: MicrosoftGraph.Event[] = eventsResponse.value;
        this.setState({events: calendarEvents});
      });
  }

  private _onRenderEventCell(item: MicrosoftGraph.Event, index: number | undefined): JSX.Element {
    return (
      <div>
        <h3>{item.subject}</h3>
        {format(new Date(item.start.dateTime), 'MMM DD, YYYY, h:mm A')} - {format(new Date(item.end.dateTime), 'h:mm A')}
      </div>
    );
  }

  public render(): React.ReactElement<IEventsProps> {
    return (
      <div>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.fUpdateProperty} />
          
        <List items={this.state.events}
          onRenderCell={this._onRenderEventCell} />
      </div>
    );
  }
}
