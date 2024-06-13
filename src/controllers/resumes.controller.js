import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { ResumesService } from "../services/resumes.service.js";

export class ResumesController {
  resumesService = new ResumesService();

  //이력서 생성
  resumeCreate = async (req, res, next) => {
    try {
      const { title, aboutMe } = req.body;
      const userId = req.user.userId;

      const createdResume = await this.resumesService.createResume(userId, title, aboutMe);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CERATE.SUCCEED,
        createdResume,
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 전체 조회
  resumeAllGet = async (req, res, next) => {
    try {
      const { sort } = req.query;
      const user = req.user;
      const { status } = req.query;
      const resumeAllget = await this.resumesService.allResume(sort, user, status);

      console.log(status);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data: resumeAllget,
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 상세 조회
  resumePlusGet = async (req, res, next) => {
    try {
      const { id } = req.params;
      const resumPlusGet = await this.resumesService.plusResume(id);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data: resumPlusGet,
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 수정
  resumePut = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, aboutMe } = req.body;

      const resumePut = await this.resumesService.putResume(id, title, aboutMe);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data: resumePut,
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 삭제
  resumeDelete = async (req, res, next) => {
    try {
      const { id } = req.params;

      const resumeDelete = await this.resumesService.deleteResume(id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: { resumeId: resumeDelete },
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 지원 상태 변경
  resumeRolePatch = async (req, res, next) => {
    try {
      const data = null;
      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 로그
  resumeLogs = async (req, res, next) => {
    try {
      const data = null;
      return res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
