import { DisplayMode } from "@microsoft/sp-core-library";
import { ILink } from "./ILink";

export interface ILinksProps {
  collectionData: ILink[];
  displayMode: DisplayMode;
  title: string;

  updateProperty: (value: string) => void;
  propertyPaneOpen: () => void;
}
