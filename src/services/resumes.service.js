import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";
import { ResumesRepository } from "../repositories/resumes.repository.js";

export class ResumesService {
  resumeRepository = new ResumesRepository();

  //이력서 생성
  createResume = async (userId, title, aboutMe) => {
    const createResume = await this.resumeRepository.createResume(userId, title, aboutMe);

    return createResume;
  };

  //이력서 전체 조회 api
  allResume = async (sort, user, status) => {
    const authId = user.userId;
    console.log(status);

    let whereCondition = {};
    if (user.role == "RECRUITER" && status) {
      whereCondition.support = status;
    }
    sort = sort?.toLowerCase();
    if (sort !== "desc" && sort !== "asc") {
      sort = "desc";
    }

    let allResume = await this.resumeRepository.allResume(sort, whereCondition);

    allResume = allResume.map((Resume) => {
      return {
        id: Resume.resumeId,
        authId: Resume.authIds.name,
        title: Resume.title,
        aboutMe: Resume.aboutMe,
        status: Resume.support,
        createdAt: Resume.createdAt,
        updatedAt: Resume.updatedAt,
      };
    });

    return allResume;
  };

  //이력서 상세 조회
  plusResume = async (id) => {
    const plusResume = await this.resumeRepository.plusResume(id);

    if (!plusResume) {
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUNE);
    }

    return plusResume;
  };

  //이력서 수정
  putResume = async (id, title, aboutMe) => {
    const plusResume = await this.resumeRepository.plusResume(id);
    if (!plusResume) throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUNE);

    await this.resumeRepository.putResume(id, title, aboutMe);

    const updatedResume = await this.resumeRepository.plusResume(id);
    return updatedResume;
  };

  //이력서 삭제
  deleteResume = async (id) => {
    const plusResume = await this.resumeRepository.plusResume(id);
    if (!plusResume) throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUNE);

    await this.resumeRepository.deleteResume(id);
    return plusResume.resumeId;
  };
}
