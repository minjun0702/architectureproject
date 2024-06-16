import express from "express";
import { createResumeValidator } from "../middlewares/validators/create-resume-validator.middleware.js";
import { updateResumeValidator } from "../middlewares/validators/update-resume-validator.middleware.js";
import { USER_ROLE } from "../constants/user.constant.js";
import { requireRoles } from "../middlewares/require-roles.middleware.js";
import { statusUpdateResumeValidator } from "../middlewares/validators/statusupdate-resume-validator.middleware.js";
import { ResumesController } from "../controllers/resumes.controller.js";

export const resumesRouter = express.Router();
const resumesController = new ResumesController();

// 이력서 생성 api
resumesRouter.post("/", createResumeValidator, resumesController.resumeCreate);

//이력서 전체 조회 api
resumesRouter.get("/", resumesController.resumeAllGet);

//이력서 상세 조회 api
resumesRouter.get("/:id", resumesController.resumePlusGet);

//이력서 수정 api
resumesRouter.put("/:id", updateResumeValidator, resumesController.resumePut);

//이력서 삭제 api
resumesRouter.delete("/:id", resumesController.resumeDelete);

//이력서 지원 상태 변경
resumesRouter.patch(
  "/:id",
  requireRoles([USER_ROLE.RECRUITER]),
  statusUpdateResumeValidator,
  resumesController.resumeRolePatch,
);

// 이력서 로그
resumesRouter.get("/:id/logs", requireRoles([USER_ROLE.RECRUITER]), resumesController.resumeLogs);

export default resumesRouter;
