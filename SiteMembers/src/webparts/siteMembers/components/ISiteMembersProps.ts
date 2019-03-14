import { MSGraphClient } from "@microsoft/sp-http";
import { ISiteMembersWebPartProps } from "../SiteMembersWebPart";
import { DisplayMode } from "@microsoft/sp-core-library";


export interface ISiteMembersProps extends ISiteMembersWebPartProps {
  graphClient: MSGraphClient;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
