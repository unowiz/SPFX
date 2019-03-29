import Views from "../container/Views";

export interface IDataProvider {
    getViews(): Promise<Views[]>;
}  
