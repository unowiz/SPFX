import { DisplayMode } from "@microsoft/sp-core-library";
import { MSGraphClient } from "@microsoft/sp-http";
import { IPersonalEmailWebPartProps } from "../PersonalEmailWebPart";

export interface IPersonalEmailProps extends IPersonalEmailWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  updateProperty: (value: string) => void;
}
