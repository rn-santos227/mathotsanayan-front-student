import { createPinia } from "pinia";
import { useAnswersModule } from "./modules/answers_module";
import { useAuthModule } from "./modules/auth_module";
import { useDashboardModule } from "./modules/dashboard_module";
import { useExamModule } from "./modules/exam_module";
import { useImageModule } from "./modules/image_module";
import { useModuleModule } from "./modules/modules_module";
import { useResultModule } from "./modules/results_module";
import { useSubjectModule } from "./modules/subject_module";

const pinia = createPinia();
export {
  pinia,
  useAnswersModule,
  useAuthModule,
  useDashboardModule,
  useExamModule,
  useImageModule,
  useModuleModule,
  useResultModule,
  useSubjectModule,
};
