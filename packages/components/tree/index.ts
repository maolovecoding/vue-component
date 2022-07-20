import { withInstall } from "@mao/utils";
import _Tree from "./src/tree.vue";
export * from "./src/types";
const Tree = withInstall(_Tree);
export default Tree;

declare module "vue" {
  export interface GlobalComponents {
    "m-tree": typeof Tree;
  }
}
