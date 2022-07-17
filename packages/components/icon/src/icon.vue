<script setup lang="ts">
import { createNameSpace } from "@mao/utils";
import { computed } from "@vue/reactivity";
interface IconProps {
  color?: string;
  size?: string | number;
}
const bem = createNameSpace("icon");
const { color, size } = defineProps<IconProps>();
// 计算一个样式来处理
const style = computed(() => {
  if (!size && !color) return {};
  return {
    ...(size
      ? { "font-size": typeof size === "number" ? size + "px" : size }
      : {}),
    ...(color ? { color: color } : {}),
  };
});
// 定义名字
defineOptions({
  name: "m-icon",
});
</script>
<template>
  <i :class="bem.b()" :style="style">
    <slot />
  </i>
</template>

<style scoped></style>
