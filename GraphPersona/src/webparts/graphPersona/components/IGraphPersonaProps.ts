import { DisplayMode } from "@microsoft/sp-core-library";
import { MSGraphClient } from "@microsoft/sp-http";

export interface IGraphPersonaProps {
  graphClient: MSGraphClient;
  displayMode: DisplayMode;
  title: string;

  fUpdateProperty: (value: string) => void;
}
