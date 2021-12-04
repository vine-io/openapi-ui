<template>
  <div class="p-4 doc">
    <div class="md:flex enter-y">
      <Menu
        class="md:w-1/6 !md:mx-0 !md:my-0 !my-0 w-full"
        :tags="tags"
        :paths="paths"
        @change-content="handleChangeContent"
      />
      <Content class="md:w-5/6 !md:mx-0 !md:my-0 !my-0 w-full" :data="content" />
    </div>
  </div>
</template>
<script lang="ts">
  import Menu from './components/Menu.vue';
  import Content from './components/Content.vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import { GetOpenAPI } from '/@/api/openapi';
  import { OpenAPI, OpenAPIPath, OpenAPIPathDocs, OpenAPITag } from '/@/api/openapi/openapi';

  class APIContent {
    url?: string;
    method?: string;
    docs?: OpenAPIPathDocs;

    constructor(url?, method?, docs?) {
      this.url = url;
      this.method = method;
      this.docs = docs;
    }
  }

  export default defineComponent({
    components: {
      Menu,
      Content,
    },
    setup() {
      const loading = ref(false);

      let doc = ref<OpenAPI>(new OpenAPI());
      let tags = ref(new Array<OpenAPITag>(0));
      // tag => url => method => OpenAPIPathDocs
      let paths = ref(new Map<string, Map<string, OpenAPIPath>>());

      let content = ref(new APIContent());

      onMounted(async () => {
        doc.value = await GetOpenAPI();

        if (doc.value.tags && doc.value.tags.length > 0) {
          tags.value = doc.value.tags;
          for (let tag of tags.value) {
            paths.value.set(tag.name as string, new Map<string, OpenAPIPath>());
          }
        }

        if (doc.value.paths) {
          for (let url of Object.keys(doc.value.paths)) {
            let pathItems = Reflect.get(doc.value.paths, url) as OpenAPIPath;
            for (let method of Object.keys(pathItems)) {
              let path = Reflect.get(pathItems, method) as OpenAPIPathDocs;
              if (path.tags && path.tags.length > 0) {
                let k = path.tags[0];
                (paths.value.get(k) as Map<string, OpenAPIPath>).set(url, pathItems);
              }
            }
          }
        }
      });

      const handleChangeContent = (c: APIContent) => {
        content.value = c;
      };

      return {
        loading,
        handleChangeContent,
        doc,
        tags,
        paths,
        content,
      };
    },
  });
</script>

<style scoped lang="less">
  .doc {
  }
</style>
