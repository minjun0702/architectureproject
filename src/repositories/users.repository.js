import { prisma } from "../utils/prisma.util.js";
import bcrypt from "bcrypt";

export class UserRepository {
  findById = async (id) => {
    await prisma.users.findUnique({
      where: { userId: id },
      omit: { password: true }, // 패스워드는 가져오지 않는다는뜻
    });
  };

  findUserById = async (userId) => {
    const user = await prisma.users.findUnique({
      where: { userId: +userId },
      omit: { password: true }, // 패스워드는 가져오지 않는다는뜻
    });

    return user;
  };

  cerateUser = async (email, password, name) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const data = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      // omit: { password: true }, // 패스워드는 가져오지 않는다는뜻
    });

    return data;
  };

  findUserEmail = async (email) => {
    const emailcheck = await prisma.users.findUnique({
      where: { email },
    });
    return emailcheck;
  };
}
