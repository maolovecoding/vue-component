import { SetupContext, InjectionKey } from "vue";
export type Key = string | number;
export interface ITreeOptions {
  label?: Key;
  key?: Key;
  children?: ITreeOptions[];
  // 是否是叶子节点
  isLeaf?: boolean;
  // 是否禁用当前节点
  disabled?: boolean;
  [key: string]: unknown;
}
export interface ITreeProps {
  data?: ITreeOptions[];
  labelField?: string;
  keyField?: string;
  childrenField?: string;
  // 默认展开的 key
  defaultExpandedKeys?: Key[];
  // 异步加载数据成功后触发的回调
  onLoad?: (node: ITreeOptions) => Promise<ITreeOptions[]>;
  // 双向绑定时 选中的数据项keys
  selectedKeys?: Key[];
  // 是否允许选中数据
  selectable?: boolean;
  // 是否允许多选
  multiple?: boolean;
}
export interface ITreeNode extends Required<ITreeOptions> {
  level: number;
  // 原始数据备份
  rawNode: ITreeOptions;
  children: ITreeNode[];
  // 是否是叶子节点
  isLeaf: boolean;
}

export interface ITreeNodeProps {
  node: ITreeNode;
  expanded?: boolean;
  loadingKeys?: Set<Key>;
  selectedKeys?: Key[];
}
// 上下文参数
export interface ITreeContext {
  slots: SetupContext<ITreeNode>["slots"];
  // emit: SetupContext<ITreeEmit>["emit"];
}

// 注入的变量
export const treeInjectKey: InjectionKey<ITreeContext> = Symbol();

export interface ITreeNodeContentProps {
  node: ITreeNode;
}
