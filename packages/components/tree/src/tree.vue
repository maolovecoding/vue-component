<script setup lang="ts">
import {
  computed,
  provide,
  ref,
  useSlots,
  watch,
} from "vue";
import { createNameSpace } from "@mao/utils";
import MTreeNode from "./treeNode.vue";
import { treeInjectKey } from "./types";
type Key = string | number;
interface ITreeOptions {
  label?: Key;
  key?: Key;
  children?: ITreeOptions[];
  // 是否是叶子节点
  isLeaf?: boolean;
  // 是否禁用当前节点
  disabled?: boolean;
  [key: string]: unknown;
}
interface ITreeProps {
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
interface ITreeNode extends Required<ITreeOptions> {
  level: number;
  // 原始数据备份
  rawNode: ITreeOptions;
  children: ITreeNode[];
  // 是否是叶子节点
  isLeaf: boolean;
}
interface ITreeEmit {
  (e: "update:selectedKeys", keys: Key[]): Key[];
}

// 提供的数据 将当前组件的插件放到provide里面
provide(treeInjectKey, {
  slots: useSlots()
});

defineOptions({
  name: "m-tree"
});
// 属性 格式化数据 格式化一个固定的结果 key label children
const {
  data = [],
  labelField = "label",
  keyField = "key",
  childrenField = "children",
  defaultExpandedKeys = [],
  onLoad,
  selectedKeys,
  // 默认可选中
  selectable = true,
  multiple = false
} = defineProps<ITreeProps>();

// 定义事件
const emits = defineEmits<ITreeEmit>();
// tree 就是对数据格式化后的结果
const tree = ref<ITreeNode[]>([]);

/**
 * 创建一个对象 从原数据中取对应值 获取相关字段值
 */
const createOptions = (
  labelField: string,
  keyField: string,
  childrenField: string
) => {
  return {
    getKey(node: ITreeOptions) {
      return node[keyField] as Key;
    },
    getLabel(node: ITreeOptions) {
      return node[labelField] as Key;
    },
    getChildren(node: ITreeOptions) {
      return node[childrenField] as ITreeOptions[];
    }
  };
};
/**
 * 将用户传递的数据进行格式化操作
 */
const createTree = (data: ITreeOptions[], parent?: ITreeNode) => {
  const tree: ITreeNode[] = traversal(data, parent);
  return tree;
};
const treeOptions = createOptions(labelField, keyField, childrenField);
/**
 * 递归遍历 整理数据
 */
const traversal = (data: ITreeOptions[], parent?: ITreeNode) => {
  return data.map(node => {
    const children = treeOptions.getChildren(node) || [];
    const treeNode: ITreeNode = {
      key: treeOptions.getKey(node),
      label: treeOptions.getLabel(node),
      children: [],
      rawNode: node,
      // 数据的层级 或者说深度
      level: parent !== undefined ? parent.level + 1 : 0,
      disabled: !!node.disabled,
      isLeaf: node.isLeaf ?? children.length === 0
    };
    if (children.length) {
      // 递归对子数据处理
      treeNode.children = traversal(node.children!, treeNode);
    }
    return treeNode;
  });
};

// 监听数据的改变
watch(
  data,
  data => {
    tree.value = createTree(data);
  },
  { immediate: true }
);
// 拍平树 实现单击可点开操作
// 需要展开的key
const expandedKeysSet = ref(new Set(defaultExpandedKeys));
/**
 * 拍平后的数据 这里需要依赖当前展开的节点 动态计算
 */
const flattenTree = computed(() => {
  // 需要展开的key
  const expandedKeys = expandedKeysSet.value;
  // 拍平后的结果
  const flattenNodes: ITreeNode[] = [];
  const nodes = tree.value; // 格式化以后的树
  const stack: ITreeNode[] = []; // 用于遍历树的栈
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i]);
  }
  // 倒叙 深度遍历 tree
  while (stack.length) {
    const node = stack.pop();
    if (node === undefined) continue;
    flattenNodes.push(node);
    // 当前节点 和当前节点的子节点都展开
    if (expandedKeys.has(node.key)) {
      const children = node.children;
      if (children.length) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i]);
        }
      }
    }
  }
  return flattenNodes;
});
/**
 * 标识节点是否需要展开
 */
const isExpanded = (node: ITreeNode) => {
  return expandedKeysSet.value.has(node.key);
};
const bem = createNameSpace("tree");
/**
 * 正在加载的keys集合
 */
const loadingKeysRef = ref(new Set<Key>());
const triggerLoading = (node: ITreeNode) => {
  // 没有孩子 且是叶子节点 进行异步加载
  if (!node.children.length && !node.isLeaf) {
    // 没有加载过这个节点 就加载这个节点的数据
    if (!loadingKeysRef.value.has(node.key)) {
      loadingKeysRef.value.add(node.key);
      // 回调异步请求数据的方法
      onLoad?.(node.rawNode).then(children => {
        // 修改原来的节点
        node.rawNode.children = children;
        // 更新处理后的node
        node.children = createTree(children, node);
        loadingKeysRef.value.delete(node.key);
      });
    }
  }
};
/**
 * 折叠菜单
 */
const collapse = (node: ITreeNode) => {
  expandedKeysSet.value.delete(node.key);
};
/**
 * 展开
 */
const expand = (node: ITreeNode) => {
  expandedKeysSet.value.add(node.key);
  // 实现对应的加载逻辑
  triggerLoading(node);
};
/**
 * 切换
 */
const toggleExpand = (node: ITreeNode) => {
  if (
    expandedKeysSet.value.has(node.key) &&
    // 当前节点正在加载 不允许折叠
    !loadingKeysRef.value.has(node.key)
  )
    collapse(node);
  else expand(node);
};
// 实现选中节点
const selectedKeysRef = ref<Key[]>([]);
watch(
  () => selectedKeys,
  value => {
    if (value) {
      // 单选只能给一个值
      if (!multiple) selectedKeysRef.value = value.slice(0, 1);
      else selectedKeysRef.value = value;
    }
  },
  { immediate: true }
);
const handleSelect = (node: ITreeNode) => {
  // 解除响应式
  let keys = Array.from(selectedKeysRef.value);
  // 不能选择 就不需要做任何事情
  if (!selectable) return;
  // 可选 看多选还是单选
  if (multiple) {
    const exist = keys.findIndex(key => key === node.key);
    if (exist !== -1) {
      // 删除
      keys.splice(exist, 1);
    } else {
      // 添加
      keys.push(node.key);
    }
  } else {
    if (keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }
  // 更新双向绑定的数据
  emits("update:selectedKeys", keys);
};
</script>
<template>
  <div :class="bem.b()">
    <m-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :loading-keys="loadingKeysRef"
      :selected-keys="selectedKeysRef"
      @toggle="toggleExpand"
      @select="handleSelect"
    ></m-tree-node>
  </div>
</template>

<style scoped></style>
