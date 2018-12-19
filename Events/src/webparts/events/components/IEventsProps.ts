import { MSGraphClient } from "@microsoft/sp-http";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IEventsProps {
  graphClient: MSGraphClient;
  displayMode: DisplayMode;
  title: string;

  fUpdateProperty: (value: string) => void;

  nrOfEvents: string;
}
