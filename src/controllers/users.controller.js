import { UserRepository } from "../repositories/users.repository.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class UserController {
  userRepository = new UserRepository();

  getMe = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const data = await this.userRepository.findUserById(userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
