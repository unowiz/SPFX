import * as React from 'react';
import styles from './GraphEvents.module.scss';
import { IGraphEventsProps } from './IGraphEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IGraphEventsState } from "./IGraphEventsState";

import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { List } from 'office-ui-fabric-react/lib/List';
import { format } from 'date-fns';

export default class GraphEvents extends React.Component<IGraphEventsProps, IGraphEventsState> {
  constructor(props: IGraphEventsProps) {
    super(props);

    this.state = {
      events: []
    };
  }

  public componentDidMount(): void {
    this.props.graphClient
      .api('/me/events')
      .get((error: any, eventResponse: any, rawResponse?: any) => {
        const calendarEvents: MicrosoftGraph.Event[] = eventResponse.value;
        console.log('calendarEvents', calendarEvents);
        this.setState({ events: calendarEvents });
      });
  }

  private _onRenderEventCell(item: MicrosoftGraph.Event, index: number | undefined): JSX.Element {
    return (
      <div>
        <h3>{item.subject}</h3>
        {format(new Date(item.start.dateTime), 'MMMM Mo, YYYY h:mm A')} - {format(new Date(item.end.dateTime), 'h:mm A')}
      </div>
    );
  }

  public render(): React.ReactElement<IGraphEventsProps> {
    return (
      <List items={this.state.events}
        onRenderCell={this._onRenderEventCell} />
    );
  }
}
