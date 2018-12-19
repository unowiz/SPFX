import IAccordionListItem from "./IAccordionListItem";

export interface IReactAccordionState {
  status: string;
  items: IAccordionListItem[];
  listItems: IAccordionListItem[];
  isLoading: boolean;
  loaderMessage: string;
}
