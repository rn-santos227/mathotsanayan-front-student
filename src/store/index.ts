import { createPinia } from "pinia";
import { useAuthModule } from "./modules/auth_module";
import { useExamModule } from "./modules/exam_module";
import { useImageModule } from "./modules/image_module";
import { useModuleModule } from "./modules/modules_module";
import { useQuestionModule } from "./modules/questions_module";
import { useSubjectModule } from "./modules/subject_module";

const pinia = createPinia();
export {
  pinia,
  useAuthModule,
  useExamModule,
  useImageModule,
  useModuleModule,
  useQuestionModule,
  useSubjectModule,
};
