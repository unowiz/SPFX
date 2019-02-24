import IFollowedResult from "../../interfaces/IFollowedResult";
export interface IPagingProps {
    allItems: IFollowedResult[];
    nrOfItems: number;
    fUpdateItems: (pagedItems: IFollowedResult[]) => void;
}
