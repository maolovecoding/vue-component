import { defineComponent, inject, PropType } from "vue";
import { ITreeNode, treeInjectKey } from "./types";

export default defineComponent({
  name: "MTreeNodeContent",
  props: {
    node: {
      type: Object as PropType<ITreeNode>,
      required: true
    }
  },
  setup(props) {
    const treeContext = inject(treeInjectKey);
    return () => {
      return treeContext?.slots.default
        ? treeContext.slots.default?.({ node: props.node })
        : props.node.label;
    };
  }
});
