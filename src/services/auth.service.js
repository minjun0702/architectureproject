import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { prisma } from "../utils/prisma.util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET,
} from "../constants/env.constant.js";

export class AuthService {
  //회원가입
  signUp = async (email, password, name) => {
    const existedUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existedUser) {
      return {
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const data = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    data.password = undefined; //패스워드 조회되지 않게
    return data;
  };

  //로그인
  signIn = async (email, password) => {
    const checkEmail = await prisma.users.findUnique({
      where: { email },
    });

    const isPasswordMatched =
      checkEmail && bcrypt.compareSync(password, checkEmail.password); //해시된 비밀번호와 일치 확인

    if (!isPasswordMatched) {
      // 이메일이 없거나, 패스워드가 일치하지 않을 경우 true
      return {
        statsus: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      };
    }

    //userid 변수 지정
    const payload = { id: checkEmail.userId };
    // 엑세스 토큰 발급 / userid + 시크릿코드 + 유효시간
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "12h",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

    // id로 조회 후 refresh 토큰이 있었다면 업데이트, 없었다면 생성
    await prisma.refreshToken.upsert({
      where: { usersId: checkEmail.userId }, //토큰 스키마 모델의 usersId, 릴레이션 user(Users테이블).userId
      update: { refreshToken: hashedRefreshToken },
      create: {
        usersId: checkEmail.userId,
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  };
}
