export interface SPCalendarItemsValue {
  Id: number;
  Title: string;
  Location?: any;
  EventDate: Date;
  EndDate: Date;
  Description?: any;
  fAllDayEvent?: boolean;
  Category?: string;
}

export interface SPCalendarItems {
  value: SPCalendarItemsValue[];
}
