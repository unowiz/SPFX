import { IUser } from "./User";

export interface ISiteMembersState {
  members: IUser[];
  error: string;
  loading: boolean;
}
