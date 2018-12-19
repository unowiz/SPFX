//import { IPickerTerm } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnpControlsProps {
  context: WebPartContext;
  description: string;
  list: string | string[];
  //terms: IPickerTerm;
}

