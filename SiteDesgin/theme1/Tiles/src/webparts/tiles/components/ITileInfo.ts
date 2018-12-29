export interface ITileInfo {
    title: string;
    description: string;
    url: string;
    icon: string;
    target: string;
}

export enum LinkTarget {
    parent = "",
    blank = "_blank"
}