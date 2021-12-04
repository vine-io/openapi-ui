<template>
  <Card class="doc-content">
    <div class="md:flex enter-y">
      <Input v-model:value="url" size="large" class="md:w-7/8 !md:mx-0 !md:my-0 !my-0 w-full">
        <template #addonBefore>
          <div class="method" :class="content.method">{{ content.method }}</div>
        </template>
      </Input>
      <Button class="md:w-1/8 !md:mx-2 !md:my-0 !my-0 w-full" type="primary" size="large">
        Send
      </Button>
    </div>
    <div class="md:flex enter-y" style="height: 300px">
      <Tabs class="w-full">
        <TabPane key="1" tab="Param">Content of Tab Pane 1</TabPane>
        <TabPane key="2" tab="Authorization">Content of Tab Pane 1</TabPane>
        <TabPane key="3" tab="Header">Content of Tab Pane 2</TabPane>
        <TabPane key="4" tab="Body">Content of Tab Pane 3</TabPane>
      </Tabs>
    </div>
    <Divider />
    <div class="md:flex enter-y" style="height: 300px">
      <Tabs class="w-full">
        <TabPane key="1" tab="Body">Content of Tab Pane 1</TabPane>
        <TabPane key="2" tab="Cookies">Content of Tab Pane 1</TabPane>
        <TabPane key="3" tab="Header">Content of Tab Pane 2</TabPane>
      </Tabs>
    </div>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import { Card, Button, Input, Tabs, TabPane, Divider } from 'ant-design-vue';
  import { APIContent } from '/@/views/openapi/components/index';

  export default defineComponent({
    name: 'Content',
    components: {
      Card,
      Button,
      Input,
      Tabs,
      TabPane,
      Divider,
    },
    props: {
      data: {
        type: Object,
      },
    },

    setup(props) {
      let url = ref('');
      let content = ref(new APIContent());

      console.log(props.data);

      onMounted(async () => {
        console.log(props);
        // content.value = props.data as;
      });

      watch(
        () => props.data,
        (val) => {
          content.value = val as APIContent;
          url.value = content.value.url;
        },
      );

      return {
        url,
        content,
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
  }
</style>
