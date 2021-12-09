<template>
  <div class="doc-content">
    <Tabs
      v-model:activeKey="activeKey"
      hideAdd
      type="editable-card"
      size="small"
      :tabBarGutter="gutter"
      @edit="handleEdit"
    >
      <TabPane v-for="(session, index) in sessions" :key="index" :tab="session.request.url">
        <Session :data="session" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { useOpenAPIStore } from '/@/store/modules/openapi';
  import Session from './Session.vue';

  export default defineComponent({
    name: 'Content',
    components: {
      Tabs,
      TabPane,
      Session,
    },
    props: {
      dataSource: {
        type: Array,
      },
    },

    setup() {
      let activeKey = ref(0);
      let gutter = ref(0);

      const apiStore = useOpenAPIStore();

      let sessions = apiStore.getAPISession;

      watch(
        () => sessions.length,
        (val) => {
          if (val > 0) {
            activeKey.value = val - 1;
          }
        },
      );

      setInterval(() => {
        apiStore.setAPISession({ store: sessions });
      }, 5000);

      const handleEdit = (targetKey: number) => {
        if (sessions.length > 1) {
          apiStore.removeSession(targetKey);
        }
      };

      return {
        activeKey,
        gutter,
        sessions,
        handleEdit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .doc-content {
    min-height: 500px;

    background-color: @component-background !important;

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
