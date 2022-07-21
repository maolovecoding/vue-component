import { withInstall } from "@mao/utils";
import _VirtualList from "./src/virtual";
const VirtualList = withInstall(_VirtualList);
export default VirtualList;
export * from "./src/types";
declare module "vue" {
  export interface GlobalComponents {
    "m-virtual-list": typeof VirtualList;
  }
}
