import { createPinia } from "pinia";
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
  useAuthModule,
  useDashboardModule,
  useExamModule,
  useImageModule,
  useModuleModule,
  useResultModule,
  useSubjectModule,
};
