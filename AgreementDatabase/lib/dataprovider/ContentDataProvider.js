var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { sp } from "@pnp/sp";
var currentUser = '';
sp.web.currentUser.get().then(function (result) {
    currentUser = result.Title;
});
var ContentDataProvider = (function () {
    function ContentDataProvider() {
    }
    // Get current user
    // Get ended agreement not closed
    ContentDataProvider.prototype.getEnded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var today, Agreements, select, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = new Date();
                        Agreements = [];
                        select = "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle("AgreementDatabase")
                                .items.select(select)
                                .filter("(AgreementEnded eq true) and (AgreementEndDate le '" + today.toISOString() + "')")
                                .expand("SalesManager,TaxCatchAll,AgreementType")
                                .get()];
                    case 1:
                        items = _a.sent();
                        items.forEach(function (item) {
                            Agreements.push({
                                AgreementName: item.Title,
                                CustomerAgreementNr: item.CustomerAgreementNr,
                                AgreementType: item.AgreementType.Title,
                                ContactPerson: item.ContactPerson,
                                DeliveryType: item.DeliveryType,
                                AgreementStartDate: item.AgreementStartDate,
                                AgreementEndDate: item.AgreementEndDate,
                                AgreementEnded: item.AgreementEnded,
                                LastPriceAdjustment: item.LastPriceAdjustment,
                                NextPriceAdjustment: item.NexPriceAdjustment,
                                Customer: item.TaxCatchAll[0].Term,
                                SalesManager: item.SalesManager.FirstName + " " + item.SalesManager.LastName
                            });
                        });
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resolve(Agreements);
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    // Get last adjustment date passed
    ContentDataProvider.prototype.getPassed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var today, Agreements, select, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = new Date();
                        Agreements = [];
                        select = "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle("AgreementDatabase")
                                .items.select(select)
                                .filter("LastPriceAdjustment le '" + today.toISOString() + "'")
                                .expand("SalesManager,TaxCatchAll,AgreementType")
                                .get()];
                    case 1:
                        items = _a.sent();
                        items.forEach(function (item) {
                            Agreements.push({
                                AgreementName: item.Title,
                                CustomerAgreementNr: item.CustomerAgreementNr,
                                AgreementType: item.AgreementType.Title,
                                ContactPerson: item.ContactPerson,
                                DeliveryType: item.DeliveryType,
                                AgreementStartDate: item.AgreementStartDate,
                                AgreementEndDate: item.AgreementEndDate,
                                AgreementEnded: item.AgreementEnded,
                                LastPriceAdjustment: item.LastPriceAdjustment,
                                NextPriceAdjustment: item.NexPriceAdjustment,
                                Customer: item.TaxCatchAll[0].Term,
                                SalesManager: item.SalesManager.FirstName + " " + item.SalesManager.LastName
                            });
                        });
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resolve(Agreements);
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    // Get Sales manager's agreements
    ContentDataProvider.prototype.getMyAgreement = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Agreements, salesManagerName, select, managerName, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Agreements = [];
                        salesManagerName = '';
                        select = "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle("AgreementDatabase")
                                .items.select("SalesManager/FirstName, SalesManager/LastName")
                                .expand("SalesManager")
                                .get()];
                    case 1:
                        managerName = _a.sent();
                        managerName.forEach(function (item) {
                            salesManagerName = item.SalesManager.FirstName + " " + item.SalesManager.LastName;
                        });
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle("AgreementDatabase")
                                .items.select(select)
                                .filter(salesManagerName + "' eq '" + currentUser + "'")
                                .expand("SalesManager,TaxCatchAll,AgreementType")
                                .get()];
                    case 2:
                        items = _a.sent();
                        items.forEach(function (item) {
                            Agreements.push({
                                AgreementName: item.Title,
                                CustomerAgreementNr: item.CustomerAgreementNr,
                                AgreementType: item.AgreementType.Title,
                                ContactPerson: item.ContactPerson,
                                DeliveryType: item.DeliveryType,
                                AgreementStartDate: item.AgreementStartDate,
                                AgreementEndDate: item.AgreementEndDate,
                                AgreementEnded: item.AgreementEnded,
                                LastPriceAdjustment: item.LastPriceAdjustment,
                                NextPriceAdjustment: item.NexPriceAdjustment,
                                Customer: item.TaxCatchAll[0].Term,
                                SalesManager: item.SalesManager.FirstName + " " + item.SalesManager.LastName
                            });
                        });
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resolve(Agreements);
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    ContentDataProvider.prototype.getContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Agreements, select, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Agreements = [];
                        select = "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle("AgreementDatabase")
                                .items.select(select)
                                .expand("SalesManager,TaxCatchAll,AgreementType")
                                .get()];
                    case 1:
                        items = _a.sent();
                        items.forEach(function (item) {
                            Agreements.push({
                                AgreementName: item.Title,
                                CustomerAgreementNr: item.CustomerAgreementNr,
                                AgreementType: item.AgreementType.Title,
                                ContactPerson: item.ContactPerson,
                                DeliveryType: item.DeliveryType,
                                AgreementStartDate: item.AgreementStartDate,
                                AgreementEndDate: item.AgreementEndDate,
                                AgreementEnded: item.AgreementEnded,
                                LastPriceAdjustment: item.LastPriceAdjustment,
                                NextPriceAdjustment: item.NexPriceAdjustment,
                                Customer: item.TaxCatchAll[0].Term,
                                SalesManager: item.SalesManager.FirstName + " " + item.SalesManager.LastName
                            });
                        });
                        console.log(items);
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    resolve(Agreements);
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    return ContentDataProvider;
}());
export default ContentDataProvider;
//# sourceMappingURL=ContentDataProvider.js.map