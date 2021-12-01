<template>
  <a-button @click="count += 1">{{ count }}</a-button>
</template>




<script lang="ts">
import { defineComponent, ref } from "vue";

  setup() {
    let count = ref(0);

    return {
      count,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  border: 1px solid;

  .span {
    display: block;
    font-size: 10px;
  }
}
</style>
