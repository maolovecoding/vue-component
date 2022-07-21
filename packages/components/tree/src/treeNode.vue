<script setup lang="ts">
import { createNameSpace } from "@mao/utils";
import MSwitcher from "./icon/switcher";
import { ITreeNode, Key } from "./types";
import Loading from "./icon/loading";
import { computed } from "vue";
import MTreeNodeContent from "./treeNodeContent";
interface ITreeNodeProps {
  node: ITreeNode;
  expanded?: boolean;
  loadingKeys: Set<Key>;
  selectedKeys?: Key[];
}

const bem = createNameSpace("tree-node");
const {
  node,
  expanded = false,
  loadingKeys,
  selectedKeys
} = defineProps<ITreeNodeProps>();
const emits = defineEmits<{
  (e: "toggle", node: ITreeNode): void;
  (e: "select", node: ITreeNode): void;
}>();
/**
 * 点击切换显示隐藏
 */
const handleExpandClick = () => {
  emits("toggle", node);
};
// 正在加载的数据keys
const isLoading = computed(() => loadingKeys.has(node.key));
// 计算是否被选中
const isSelected = computed(() => selectedKeys?.includes(node.key));

const handleSelect = () => {
  // 是否禁用了
  if (node.disabled) return;
  emits("select", node);
};
</script>
<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', !!isSelected),
      bem.is('disabled', node.disabled)
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: node.level * 16 + 'px' }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node.isLeaf },
          bem.is('leaf', node.isLeaf)
        ]"
        @click="handleExpandClick"
      >
        <m-icon size="25" color="pink">
          <Loading v-if="isLoading" />
          <m-switcher v-else />
        </m-icon>
      </span>
      <span :class="bem.e('label')" @click="handleSelect">
        <MTreeNodeContent :node="node"> </MTreeNodeContent>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
