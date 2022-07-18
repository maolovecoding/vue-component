<script setup lang="ts">
import { createNameSpace } from "@mao/utils";
import MSwitcher from "./icon/switcher";
import { ITreeNode } from "./types";
interface ITreeNodeProps {
  node: ITreeNode;
  expanded?: boolean;
}

const bem = createNameSpace("tree-node");
const { node, expanded = false } = defineProps<ITreeNodeProps>();
const emits = defineEmits<{
  (e: "toggleExpand", node: ITreeNode): void;
}>();
/**
 * 点击切换显示隐藏
 */
const handleExpandClick = () => {
  emits("toggleExpand", node);
};
</script>
<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
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
          <m-switcher />
        </m-icon>
      </span>
      <span>{{ node.label }}</span>
    </div>
  </div>
</template>

<style scoped></style>
