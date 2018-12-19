import * as moment from 'moment';

export interface FullCalendarEvent {
  id: number;
  title: string;
  start: moment.Moment;
  end: moment.Moment;
  color: string;
  allDay: boolean;
  description: string;
  location: string;
  category: string;
}
