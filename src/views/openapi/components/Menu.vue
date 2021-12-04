<template>
  <div class="doc-menu">
    <Collapse v-model:activeKey="activeKey" expand-icon-position="left" :bordered="false">
      <CollapsePanel v-for="(item, index) in tags" :key="index" :header="item.name">
        <template v-for="[url, path] in paths.get(item.name)" :key="url">
          <div
            v-for="(method, idx) in Object.keys(path)"
            :key="idx"
            class="doc-paths"
            :class="method"
            @click="onSelectPath(path, method, url)"
          >
            {{ method }} {{ url }}
          </div>
        </template>
      </CollapsePanel>
    </Collapse>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Collapse, CollapsePanel } from 'ant-design-vue';
  import { OpenAPIPath, OpenAPIPathDocs } from '/@/api/openapi/openapi';
  import { APIContent } from '/@/views/openapi/components/index';

  export default defineComponent({
    name: 'Menu',
    components: {
      Collapse,
      CollapsePanel,
    },
    props: {
      tags: Array,
      paths: Map,
    },
    emits: ['changeContent'],

    setup(props, context) {
      let activeKey = ref(['0']);

      const onSelectPath = (path: OpenAPIPath, method: string, url: string) => {
        let docs = Reflect.get(path, method) as OpenAPIPathDocs;
        context.emit('changeContent', new APIContent(url, method, docs));
      };

      onMounted(async () => {
        activeKey.value = props.tags?.map(() => '0') || ['0'];
      });

      return {
        activeKey,
        onSelectPath,
      };
    },
  });
</script>

<style lang="less" scoped>
  .doc-menu {
  }
</style>
