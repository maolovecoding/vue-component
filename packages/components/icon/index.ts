import { withInstall } from "@mao/utils";
import _Icon from "./src";
const Icon = withInstall(_Icon);
export default Icon;

// 类型提示 扩展类型
declare module "vue" {
  export interface GlobalComponents {
    // 接口会自动合并
    "m-icon": typeof Icon;
  }
}
