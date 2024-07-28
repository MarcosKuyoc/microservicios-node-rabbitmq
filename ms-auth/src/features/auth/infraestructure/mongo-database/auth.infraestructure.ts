import { Model } from "mongoose";
import { Auth } from "../../domain/auth";
import { AuthRepository } from "../../domain/auth.repository";
import { Where } from "../../domain/filters.interface";

export class AuthInfraestructure implements AuthRepository {
  async register(auth: Auth): Promise<string> {
    const authCreated = await Model.create(auth);
    return authCreated._id;
  }

  async findOne(filter: Where): Promise<Auth | null> {
    return await Model.findOne(filter);
  }

  async update(filter: Where, options: Where): Promise<void> {
    await Model.updateOne(filter, options);
  }
}