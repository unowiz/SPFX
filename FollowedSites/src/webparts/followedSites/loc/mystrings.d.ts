declare interface IFollowedSitesWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  //Web part properties
  SortOrderDefaultLabel: string;
  NrOfFollowedItemsLabel: string;

  // Web part
  NoFollowedSitesMsg: string;
  SitesFilterLabel: string;
  NoFollowSitesFoundMsg: string;
  loading: string;
  error: string;
}

declare module 'FollowedSitesWebPartStrings' {
  const strings: IFollowedSitesWebPartStrings;
  export = strings;
}
