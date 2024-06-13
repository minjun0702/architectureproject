import { prisma } from "../utils/prisma.util.js";

export class UserRepository {
  findUserById = async (userId) => {
    return await prisma.users.findUnique({
      where: { userId: +userId },
    });
  };
}
