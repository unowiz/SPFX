import { DisplayMode } from "@microsoft/sp-core-library";
import { ITilesWebPartProps } from "../TilesWebPart";

export interface ITilesProps extends ITilesWebPartProps {
  displayMode: DisplayMode;

  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}
