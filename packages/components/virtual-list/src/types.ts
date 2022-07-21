import { ITreeNode, Key } from "@mao/components/tree";
export interface IVirtualListProps {
  items: ITreeNode[];
  // 最多展示的数据列表个数
  remain?: Key;
  // 列表项的高度
  size?:Key
}
