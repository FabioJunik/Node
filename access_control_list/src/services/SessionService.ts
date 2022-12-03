import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repositories";

type UserRequest = {
  username: string;
  password: string;
};

export class SessionService {
  async execute({ username, password }: UserRequest) {
    const repo = UserRepository();

    const user = await repo.findOne({ where: { username } });

    if (!user) {
      return new Error("User does not exists!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("User or Password incorrect");
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    });

    return { token };
  }
}
