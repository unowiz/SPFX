import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IReadItemsPnPProps {
  description: string;
  context: WebPartContext;
  displayMode: DisplayMode;
  title: string;
  updateTitle: (value: string) => void;
  list: string;
}

export interface IReadItemsPnPState {
  items?: any[];
}
