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
  allResume = async (sort, whereCondition) => {
    let allResume = await prisma.resume.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: sort,
      },
      include: {
        authIds: true,
      },
    });

    allResume = allResume.map((Resume) => {
      return {
        resumeId: Resume.resumeId,
        userId: Resume.authIds.userId,
        name: Resume.authIds.name,
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
  plusResume = async (id, authId) => {
    let plusResume = await prisma.resume.findUnique({
      where: { resumeId: +id, authId },
      include: {
        authIds: true,
      },
    });

    if (!plusResume) {
      return plusResume;
    }

    let data = {
      resumeId: plusResume.resumeId,
      userId: plusResume.authIds.userId,
      name: plusResume.authIds.name,
      title: plusResume.title,
      aboutMe: plusResume.aboutMe,
      status: plusResume.support,
      createdAt: plusResume.createdAt,
      updatedAt: plusResume.updatedAt,
    };

    return data;
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
