import { prisma } from "../utils/prisma.util.js";

export class ResumesRepository {
  //이력서 생성
  createResume = async (userId, title, aboutMe) => {
    const cerateResume = await prisma.resume.create({
      data: { userId, title, aboutMe },
    });
    return cerateResume;
  };

  //이력서 전체 조회
  allResume = async () => {
    const allResume = await prisma.resume.findMany();
    return allResume;
  };

  //이력서 상세 조회
  plusResume = async () => {};

  //이력서 수정
  putResume = async () => {};

  //이력서 삭제
  deleteResume = async () => {};
}
