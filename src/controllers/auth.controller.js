import { AuthService } from "../services/auth.service.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class AuthController {
  authService = new AuthService();

  //회원가입 api
  signUp = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const singUpApi = await this.authService.signUp(
        email,
        password,
        name,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data: singUpApi,
      });
    } catch (err) {
      next(err);
    }
  };

  //로그인;
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const singInApi = await this.authService.signIn(
        email,
        password,
      );

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: singInApi,
      });
    } catch (err) {
      next(err);
    }
  };
}
