<script setup lang="ts">
import { ref } from "vue";
import { ITreeOptions } from "@mao/components/tree";
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
function createData2() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false // 这里为false 表示点击的时候动态的加载子节点
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ];
}
function nextLabel(currentLabel?: string) {
  if (!currentLabel) return "Out of Tao, One is born";
  if (currentLabel === "Out of Tao, One is born") return "out of One, Two";
  if (currentLabel === "out of One, Two") return "out of Two, Three";
  if (currentLabel === "out of Two, Three") {
    return "Out of Three, the created universe";
  }
  if (currentLabel === "Out of Three, the created universe") {
    return "Out of Tao, One is born";
  }
  return "";
}
function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}
const data = ref(createData2());
const handleLoad = (node: ITreeOptions) => {
  return new Promise<ITreeOptions[]>(resolve => {
    setTimeout(resolve, 1000, [
      {
        label: nextLabel(node.label as string),
        key: node.key + nextLabel(node.label as string),
        isLeaf: false
      }
    ]);
  });
};
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
    :default-expanded-keys="['41', '31']"
    :on-load="handleLoad"
  ></m-tree>
</template>
