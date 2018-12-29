declare interface ITilesWebPartStrings {
  PropertyPaneDescription: string;
  TilesListDescription: string;
  TileHeight: string;
  iconInformation: string;

  tilesDataLabel: string;
  tilesPanelHeader: string;
  tilesManageBtn: string;

  titleField: string;
  descriptionField: string;
  urlField: string;
  iconField: string;
  targetField: string;
  targetCurrent: string;
  targetNew: string;

  noTilesIconText: string;
  noTilesConfigured: string;
  noTilesBtn: string;
}

declare module 'TilesWebPartStrings' {
  const strings: ITilesWebPartStrings;
  export = strings;
}
