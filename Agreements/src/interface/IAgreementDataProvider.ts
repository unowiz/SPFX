import Agreement from "../container/Agreement";

export interface IAgreementDataProvider {
    getAgreements(): Promise<Agreement[]>;
}