<template>
  <div class="p-4">
    <div class="md:flex enter-y doc-content">
      <Collapse
        v-model:activeKey="activeKey"
        expand-icon-position="left"
        :bordered="false"
        class="md:w-1/6 !md:mx-0 !md:my-0 !my-0 w-full"
      >
        <CollapsePanel v-for="(item, index) in doc.tags" :key="index" :header="item.name">
          <p>{{ item.description }}</p>
        </CollapsePanel>
        <!--        <CollapsePanel key="2" header="This is panel header 2">-->
        <!--          <p>{{ text }}</p>-->
        <!--        </CollapsePanel>-->
        <!--        <CollapsePanel key="3" header="This is panel header 3">-->
        <!--          <p>{{ text }}</p>-->
        <!--        </CollapsePanel>-->
      </Collapse>
      <Card class="md:w-5/6 !md:mx-0 !md:my-0 !my-0 w-full">{{ doc.tags }}</Card>
    </div>
  </div>
</template>
<script lang="ts">
  import { Collapse, CollapsePanel, Card } from 'ant-design-vue';
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import { GetOpenAPI } from '/@/api/openapi';
  import { OpenAPI, OpenAPIPath, OpenAPITag } from '/@/api/openapi/openapi';

  export default defineComponent({
    components: {
      Collapse,
      CollapsePanel,
      Card,
    },
    setup() {
      const activeKey = ref(['1']);
      const expandIconPosition = ref('left');

      let doc = ref<OpenAPI>(new OpenAPI());
      let tags = ref(new Array<OpenAPITag>(0));
      let paths = ref(new Map());

      onMounted(async () => {
        await GetOpenAPI();
        // let rsp = await GetOpenAPI();
        // // doc.value = rsp;
        // // tags.value = doc.value.tags ? doc.value.tags : [];
        // // if (doc.value.paths) {
        // //   console.log(typeof (rsp.paths as Map<string, OpenAPIPath>));
        // //   // for (let entry of unref(doc.value.paths).entries()) {
        // //   //   paths.value.set(entry[0], entry[1]);
        // //   // }
        // // }
        // // console.log(paths);
        // // let tt = new Proxy(rsp, {
        // //   get(target, name) {
        // //     console.log(target.paths);
        // //     console.log(name);
        // //     return target;
        // //   },
        // // });
        // let path: Map<string, OpenAPIPath> = new Map<string, OpenAPIPath>();
        // // path.set('1', new OpenAPIPath());
        // Object.assign(path, rsp.paths);
        // // console.log(path.get('/api/v1'));
      });

      const handleClick = (event: MouseEvent) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      };
      watch(activeKey, (_) => {
        // console.log(val);
      });

      return {
        activeKey,
        expandIconPosition,
        handleClick,
        doc,
        tags,
        paths,
      };
    },
  });
</script>

<style scoped lang="less">
  .doc-content {
    min-height: 720px;
  }
</style>
