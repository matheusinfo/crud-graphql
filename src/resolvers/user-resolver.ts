import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { randomUUID } from "node:crypto";
import { UserInput } from "../inputs/user-input";
import { UserModel } from "../models/user-model";

@Resolver(() => UserModel)
export class UserResolver {
  users: UserModel[];

  constructor() {
    this.users = [];
  }

  @Mutation(() => UserModel)
  async createUser(@Arg("args") args: UserInput) {
    const user = {
      id: randomUUID(),
      name: args.name,
      email: args.email,
      password: args.password,
      age: args.age,
      github: args.github,
    };

    this.users.push(user);

    return user;
  }

  @Query(() => [UserModel!]!)
  async getUsers() {
    return this.users;
  }

  @Mutation(() => UserModel)
  async updateUser(@Arg("id") id: string, @Arg("email") email: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    user.email = email;

    return user;
  }

  @Mutation(() => UserModel)
  async deleteUser(@Arg("id") id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
