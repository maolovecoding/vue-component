import { createNameSpace } from "@mao/utils";
import {
  DefineComponent,
  onMounted,
  reactive,
  ref,
  computed,
  watch
} from "vue";
import { IVirtualListProps } from "./types";
export default {
  name: "MVirtualList",
  props: ["items", "remain", "size"],
  setup(props: IVirtualListProps, { slots }) {
    const bem = createNameSpace("vl");
    const wrapperRef = ref<HTMLElement>();
    const barRef = ref<HTMLElement>();
    // 计算显示的区域
    const state = reactive({
      start: 0,
      end: parseInt(props.remain as string)
    });
    // 显示的数据 这里应该多展示 上8条 和 下八条 保证快速滚动数据时不会出现白屏
    const prev = computed(() => Math.min(state.start, props.remain as number));
    const next = computed(() =>
      Math.min(props.items.length - state.end, props.remain as number)
    );
    const visibleData = computed(() =>
      // 上下都补上8个数据
      props.items.slice(state.start - prev.value, state.end + next.value)
    );

    const offset = ref(0);
    const handleScroll = () => {
      console.log(1);
      // 根据当前滚动的距离 算出滚上去了多少数据
      const scrollTop = wrapperRef.value!.scrollTop;
      // 划上去了多少
      state.start = Math.floor(scrollTop / parseInt(props.size as string));
      state.end = state.start + parseInt(props.remain as string);
      // 滚动了多少个上去
      offset.value =
        (state.start - prev.value) * parseInt(props.size as string);
    };
    const initWrapper = () => {
      wrapperRef.value!.style.height =
        parseInt(props.remain as string) * parseInt(props.size as string) +
        "px";
      barRef.value!.style.height =
        props.items.length * parseInt(props.size as string) + "px";
    };
    onMounted(initWrapper);
    watch(() => props.items, initWrapper);
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          <div class={bem.e("scroll-bar")} ref={barRef}></div>
          <div
            class={bem.e("scroll-list")}
            style={{ transform: `translate3d(0, ${offset.value}px, 0)` }}
          >
            {visibleData.value.map(node => slots.default?.({ node }))}
          </div>
        </div>
      );
    };
  }
} as unknown as DefineComponent<IVirtualListProps>;
