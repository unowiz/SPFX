declare interface IEventsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  NrOfEventsToShow: string;
}

declare module 'EventsWebPartStrings' {
  const strings: IEventsWebPartStrings;
  export = strings;
}
