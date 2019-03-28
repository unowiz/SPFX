import Agreement from "../container/Agreement";
import Views from "../container/Views";
export interface IAgreementDataProvider {
    getAgreements(): Promise<Agreement[]>;
    getViews(): Promise<Views[]>;
}
