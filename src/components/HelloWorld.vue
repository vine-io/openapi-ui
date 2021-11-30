<template>
  <a-button @click="count += 1">{{ count }}</a-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    msg: {
      type: String,
    },
  },

  setup() {
    let count = ref(0);

    return {
      count,
    };
  },
});
</script>

<style lang="less" scoped>
.header {
  border: 1px solid;

  .span {
    display: block;
    font-size: 10px;
  }
}
</style>
