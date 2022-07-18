export type Key = string | number;
export interface ITreeOptions {
  label?: Key;
  key?: Key;
  children?: ITreeOptions[];
  // 是否是叶子节点
  isLeaf?: boolean;
  [key: string]: unknown;
}
export interface ITreeProps {
  data?: ITreeOptions[];
  labelField?: string;
  keyField?: string;
  childrenField?: string;
  // 默认展开的 key
  defaultExpandedKeys?: Key[];
}
export interface ITreeNode extends Required<ITreeOptions> {
  level: number;
  // 原始数据备份
  rawNode: ITreeOptions;
  children: ITreeNode[];
  // 是否是叶子节点
  isLeaf: boolean;
}

interface ITreeNodeProps {
  node: ITreeNode;
  expanded?: boolean;
}
