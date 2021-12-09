<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView v-if="isRouterAlive" />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ref, provide, nextTick } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  // support Multi-language
  const { getAntdLocale } = useLocale();
  const isRouterAlive = ref(true);

  // Listening to page changes and dynamically changing site titles
  useTitle();

  const reload = () => {
    isRouterAlive.value = false;
    nextTick(function () {
      isRouterAlive.value = true;
    });
  };

  provide('reload', reload);
</script>
