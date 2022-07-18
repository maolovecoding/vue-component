<script setup lang="ts">
import { ref } from "vue";
import { AddCircle } from "@vicons/ionicons5";
import "@mao/theme-chalk";

function createData(level = 4, parentKey = ""): any {
  if (!level) return [];
  const arr = new Array(6 - level).fill(0);
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx;
    return {
      label: createLabel(level), // 显示的内容
      key, // 为了唯一性
      children: createData(level - 1, key) // 孩子
    };
  });
}
function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}
const data = ref(createData());
</script>

<template>
  <m-icon color="blue" :size="20">
    <add-circle />
  </m-icon>
  <!-- tree组件 使用时传递一个树形结构 -->
  <m-tree
    :data="data"
    label-field="label"
    key-field="key"
    children-field="children"
    :default-expanded-keys="['41','31']"
  ></m-tree>
</template>
