import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IListRepositoryDebuggerWebPartProps {
  title: string;
  numberOfItems: number;
  cacheResult: boolean;
  filter: string;
  listTitle: string;
  webUrl: string;
  context: WebPartContext;
}
