import { Auth } from "./auth";
import { Where } from "./filters.interface";

export interface AuthRepository {
  register(auth: Auth): Promise<string>;
  findOne(filter: Where): Promise<Auth | null>;
  update(filter: Where, options: Where): Promise<void>
}