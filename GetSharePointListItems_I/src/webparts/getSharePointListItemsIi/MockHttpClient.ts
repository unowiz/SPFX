import { ISPList } from "./GetSharePointListItemsIiWebPart";

export default class MockHttpClient {
    private static _items: ISPList[] = [
        { Title: 'Barclays'},
        { Title: 'Press Office in Melborne'},
        { Title: 'Vodaphone'},
        { Title: 'Manager in New York'},
    ];

    public static get(): Promise<ISPList[]> {
        return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
} 