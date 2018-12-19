declare interface IReactAccordionWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  ListNameLabel: string;
  MaxItemsPerPageLabel: string;

}

declare module 'ReactAccordionWebPartStrings' {
  const strings: IReactAccordionWebPartStrings;
  export = strings;
}
