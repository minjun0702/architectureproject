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

  //이력서 전체 조회
  allResume = async (sort) => {
    sort = sort?.toLowerCase();
    if (sort !== "desc" && sort !== "asc") {
      sort = "desc";
    }

    const allResume = await this.resumeRepository.allResume(sort);

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
    if (!plusResume) throw new Error(HttpError.NotFound);

    await this.resumeRepository.putResume(id, title, aboutMe);

    const updatedResume = await this.resumeRepository.plusResume(id);
    return updatedResume;
  };

  //이력서 삭제
  deleteResume = async (id) => {
    const plusResume = await this.resumeRepository.plusResume(id);
    if (!plusResume) throw new Error("존재하지 않는 게시글입니다");

    await this.resumeRepository.deleteResume(id);
    return { resumeId: plusResume.resumeId };
  };
}
