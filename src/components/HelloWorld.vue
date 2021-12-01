<template>
  <div>version: {{ out.openapi }}</div>
</template>


<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {GetOpenAPI, OpenAPI} from "../api/openapi";

let out: Ref<OpenAPI> = ref(new OpenAPI());

onMounted(async () => {
  out.value = await GetOpenAPI()
})
</script>

<style lang="less" scoped>
</style>
