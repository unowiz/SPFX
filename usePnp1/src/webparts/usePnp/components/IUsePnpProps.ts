import { IListItem } from "../IListItem";

export interface IUsePnpProps {
  loadListItems: () => Promise<IListItem[]>;
  description: string;
}
