<template>
  <Card class="doc-content">
    <div class="md:flex enter-y">
      <Input v-model:value="path" size="large" class="md:w-7/8 !md:mx-0 !md:my-0 !my-0 w-full">
        <template #addonBefore>
          <div class="method" :class="content.method"
            >{{ content.method ? content.method.toUpperCase() : 'GET' }}
          </div>
        </template>
      </Input>
      <Button class="md:w-1/8 !md:mx-2 !md:my-0 !my-0 w-full" type="primary" size="large">
        Send
      </Button>
    </div>
    <div class="md:flex enter-y content-request">
      <Tabs class="w-full">
        <TabPane class="content-request-body" key="1" tab="Param">
          <Parameters :data="paramData" @change="handleParams" />
        </TabPane>
        <TabPane class="content-request-body" key="2" tab="Authorization"
          >Content of Tab Pane 1
        </TabPane>
        <TabPane class="content-request-body" key="3" tab="Header">Content of Tab Pane 2</TabPane>
        <TabPane class="content-request-body" key="4" tab="Body">Content of Tab Pane 3</TabPane>
      </Tabs>
    </div>
    <Divider />
    <div class="md:flex enter-y content-response">
      <Tabs class="w-full">
        <TabPane key="1" tab="Body">Content of Tab Pane 1</TabPane>
        <TabPane key="2" tab="Cookies">Content of Tab Pane 1</TabPane>
        <TabPane key="3" tab="Header">Content of Tab Pane 2</TabPane>
      </Tabs>
    </div>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, Ref, ref, watch } from 'vue';
  import { Card, Button, Input, Tabs, TabPane, Divider } from 'ant-design-vue';
  import { APIContent } from '/@/views/openapi/components/index';
  import Parameters, { DataItem } from '/@/views/openapi/components/Parameters.vue';

  interface URL {
    path: string;
    params: string;
  }

  function resolveURL(url: string): DataItem[] {
    let items: DataItem[] = [];

    let start = 0;
    for (let index = 0; index < url.length; index++) {
      let c = url[index];
      if (c === '{') {
        start = index;
        continue;
      }
      if (c === '}') {
        items.push({
          selected: true,
          keys: url.slice(start + 1, index),
          value: '',
          desc: '',
        });
      }
    }

    return items;
  }

  export default defineComponent({
    name: 'Content',
    components: {
      Card,
      Button,
      Input,
      Tabs,
      TabPane,
      Divider,
      Parameters,
    },
    props: {
      data: {
        type: Object,
      },
    },

    setup(props) {
      let url = ref({
        path: '',
        params: '',
      });
      let content = ref(new APIContent());
      let path = ref('');
      let paramData: Ref<DataItem[]> = ref([]);

      console.log(props.data);

      // onMounted(async () => {
      //   url.value.path = content.value.url || '';
      //   changePath(url.value);
      // });

      const handleParams = (params: string) => {
        url.value.params = params;
        changePath(url.value);
      };

      watch(
        () => props.data,
        (val) => {
          content.value = val as APIContent;
          if (content.value.url) {
            url.value.path = content.value.url;
            changePath(url.value);
            paramData.value = resolveURL(content.value.url);

            paramData.value.push({
              selected: false,
              keys: '',
              value: '',
              desc: '',
            });

            // console.log(items);
          }
        },
      );

      const changePath = (url: URL) => {
        if (url.path) {
          path.value = url.params ? url.path + '?' + url.params : url.path;
        }
      };

      return {
        url,
        content,
        path,
        paramData,
        handleParams,
      };
    },
  });
</script>

<style lang="less" scoped>
  .doc-content {
    min-height: 500px;

    .method {
      font-size: 16px;
      width: 75px;
    }

    .get {
    }

    .post {
      //color: @primary-color;
    }

    .patch {
    }

    .put {
    }

    .delete {
    }

    .content-request-body {
      height: 280px;
      overflow-y: auto;
    }

    .content-response {
      min-height: 300px;
    }
  }
</style>
