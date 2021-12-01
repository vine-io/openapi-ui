<template>
  <a-button @click="count += 1">{{ count }}</a-button>

  <div class="header">header {{ count }}</div>
</template>


<script setup lang="ts">
import {ref} from "vue";
import {GetOpenAPI} from "../api/openapi";

let count = ref(0);

let out = GetOpenAPI();

out.then(out => {
  console.log(out.openapi)
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  font-size: 10px;
}
</style>
