import { createPinia } from "pinia";
import { useAuthModule } from "./modules/auth_module";
import { useModuleModule } from "./modules/modules_module";

const pinia = createPinia();
export { pinia, useAuthModule, useModuleModule };
