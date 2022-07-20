<script setup lang="ts">
import { createNameSpace } from "@mao/utils";
import MSwitcher from "./icon/switcher";
import { ITreeNode, Key } from "./types";
import Loading from "./icon/loading";
import { computed } from "vue";
interface ITreeNodeProps {
  node: ITreeNode;
  expanded?: boolean;
  loadingKeys: Set<Key>;
}

const bem = createNameSpace("tree-node");
const { node, expanded = false, loadingKeys } = defineProps<ITreeNodeProps>();
const emits = defineEmits<{
  (e: "toggleExpand", node: ITreeNode): void;
}>();
/**
 * 点击切换显示隐藏
 */
const handleExpandClick = () => {
  emits("toggleExpand", node);
};
const isLoading = computed(() => loadingKeys.has(node.key));
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
          <Loading v-if="isLoading" />
          <m-switcher v-else />
        </m-icon>
      </span>
      <span>{{ node.label }}</span>
    </div>
  </div>
</template>

<style scoped></style>
