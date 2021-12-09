<template>
  <div class="doc-session">
    <div class="md:flex enter-y">
      <Input
        v-model:value="request.url"
        size="large"
        class="md:w-7/8 !md:mx-0 !md:my-0 !my-0 w-full"
      >
        <template #addonBefore>
          <div class="method" :class="request.method"
            >{{ request.method ? request.method.toUpperCase() : 'GET' }}
          </div>
        </template>
      </Input>
      <Button class="md:w-1/8 !md:mx-2 !md:my-0 !my-0 w-full" type="primary" size="large">
        Send
      </Button>
    </div>
    <div class="md:flex enter-y content-request">
      <Tabs class="w-full" size="small">
        <TabPane class="content-request-body" key="1" tab="Param">
          <Parameters :data="request" />
        </TabPane>
        <TabPane class="content-request-body" key="2" tab="Authorization"
          >Content of Tab Pane 1
        </TabPane>
        <TabPane class="content-request-body" key="3" tab="Header">Content of Tab Pane 2</TabPane>
        <TabPane class="content-request-body" key="4" tab="Body">Content of Tab Pane 3</TabPane>
      </Tabs>
    </div>
    <Divider style="margin: 12px 0" />
    <div class="md:flex enter-y content-response">
      <Tabs class="w-full" size="small">
        <TabPane key="1" tab="Body">Content of Tab Pane 1</TabPane>
        <TabPane key="2" tab="Cookies">Content of Tab Pane 1</TabPane>
        <TabPane key="3" tab="Header">Content of Tab Pane 2</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue';
  import { Button, Input, Tabs, TabPane, Divider } from 'ant-design-vue';
  import Parameters from '/@/views/openapi/components/Parameters.vue';
  import { OpenAPISession } from '/#/store';

  export default defineComponent({
    name: 'Session',
    components: {
      Button,
      Input,
      Tabs,
      TabPane,
      Divider,
      Parameters,
    },
    props: {
      data: Object,
    },

    setup(props) {
      const { docs, request, response } = props.data as OpenAPISession;

      watch(
        () => request,
        (val) => {
          console.log(val);
        },
      );

      watch(
        () => request.parameters,
        (val) => {
          let parameters = val;
          let query: string[] = [];
          let paths: Map<string, string> = new Map<string, string>();

          for (let param of parameters) {
            if (param.in === 'path') {
              paths.set(param.keys, param.value);
            }
            if (param.in === 'query' && param.keys !== '' && param.selected) {
              query.push(`${param.keys}=${param.value}`);
            }
          }
          let targetUrl = request.path;
          for (let [key, value] of paths) {
            targetUrl = targetUrl.replace('{' + key + '}', value);
          }

          request.url = targetUrl + '?' + query.join('&');
        },
      );

      return {
        docs,
        request,
        response,
      };
    },
  });
</script>

<style lang="less" scoped>
  .doc-session {
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
