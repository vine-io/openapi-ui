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
  import { KVD, OpenAPIPath, OpenAPIPathDocs, OpenAPISession, Request } from '/#/store';
  import { useOpenAPIStore } from '/@/store/modules/openapi';

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

    setup(props) {
      let activeKey = ref(['0']);

      const apiStore = useOpenAPIStore();

      const onSelectPath = (path: OpenAPIPath, method: string, url: string) => {
        let docs = Reflect.get(path, method) as OpenAPIPathDocs;

        let request = {
          method: method,
          path: url,
          url: url,
          parameters: new Array<KVD>(),
          // authorization?: Bearer | Basic;
          headers: new Array<KVD>(),
          body: new Array<KVD>(),
        };

        if (docs.parameters) {
          for (let item of docs.parameters) {
            let param: KVD = {
              in: item.in || 'query',
              required: item.required || false,
              selected: true,
              keys: item.name || '',
              value: '',
              edited: [],
            };
            request.parameters.push(param);
          }
        }

        let session = {
          request: request,
          response: {},
          docs: docs,
        };

        apiStore.pushSession(session);
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
