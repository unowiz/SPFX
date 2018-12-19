import { FullCalendarEvent } from "../model/FullCalendarEvent";

export interface IAggregatedCalendarService {
  getEventsForCalendar(
    calendarRestApi: string,
    calendarColor: string,
    startDate: string,
    endDate: string): Promise<FullCalendarEvent[]>;
}
