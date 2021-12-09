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
        <Session :index="index" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, inject } from 'vue';
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
      const reload = inject('reload') as Function;

      const apiStore = useOpenAPIStore();

      let sessions = ref(apiStore.getAPISession);

      watch(
        () => sessions.value.length,
        (val, old) => {
          if (val > 0 && val > old) {
            activeKey.value = val - 1;
          }
        },
      );

      setInterval(() => {
        apiStore.setAPISession({ store: sessions.value });
      }, 5000);

      const handleEdit = (key: number) => {
        if (sessions.value.length <= 1) {
          return;
        }
        console.log(key);
        apiStore.removeSession(key);
        if (key === 0) {
          activeKey.value = 0;
          reload();
        } else {
          activeKey.value = key - 1;
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
