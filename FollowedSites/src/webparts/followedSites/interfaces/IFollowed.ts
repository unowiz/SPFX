import IFollowedResult from "./IFollowedResult";
import IErrorMessage from "./IErrorMessage";

export default interface IFollowed {
  '@odata.context': string;
  error?: IErrorMessage;
  value: IFollowedResult[];
}
