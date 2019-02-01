declare interface IDividerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  ListTitleFieldLabel: string;
  WebUrlFieldLabel: string;
  FilterFieldLabel: string;
  NumberOfItemsFieldLabel: string;
  CacheFieldLabel: string;
  LocalListFieldLabel: string; 
}

declare module 'DividerWebPartStrings' {
  const strings: IDividerWebPartStrings;
  export = strings;
}
