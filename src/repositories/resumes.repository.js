import { prisma } from "../utils/prisma.util.js";

export class ResumesRepository {
  //이력서 생성
  createResume = async (userId, title, aboutMe) => {
    const cerateResume = await prisma.resume.create({
      data: { authId: userId, title, aboutMe },
    });
    return cerateResume;
  };

  //이력서 전체 조회
  allResume = async (sort) => {
    const allResume = await prisma.resume.findMany({
      orderBy: {
        createdAt: sort,
      },
    });
    return allResume;
  };

  //이력서 상세 조회
  plusResume = async (id) => {
    const plusResume = await prisma.resume.findUnique({
      where: { resumeId: +id },
    });
    return plusResume;
  };

  //이력서 수정
  putResume = async (id, title, aboutMe) => {
    const putResume = await prisma.resume.update({
      where: { resumeId: +id },
      data: { title, aboutMe },
    });
    return putResume;
  };

  //이력서 삭제
  deleteResume = async (id) => {
    const deleteResume = await prisma.resume.delete({
      where: { resumeId: +id },
    });
    return deleteResume;
  };
}
