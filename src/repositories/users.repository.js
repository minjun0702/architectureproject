import { prisma } from "../utils/prisma.util.js";

export class UserRepository {
  findUserById = async (userId) => {
    const user = await prisma.users.findUnique({
      where: { userId: +userId },
    });
    user.password = undefined;
    return user;
  };
}
