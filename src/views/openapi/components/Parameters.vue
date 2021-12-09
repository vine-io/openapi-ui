<template>
  <div>
    <h1>Query Params</h1>
    <Table :columns="columns" :data-source="parameters" size="small" :pagination="false" bordered>
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.dataIndex === 'selected'">
          <div class="check-box" v-if="index !== parameters.length - 1">
            <span class="icon"><Icon icon="ant-design:swap-outlined" /></span>
            <Checkbox :disabled="record['required']" v-model:checked="record[column.dataIndex]" />
          </div>
        </template>
        <template v-else-if="column.dataIndex !== 'action'">
          <div v-if="record['edited'].includes(column.dataIndex)">
            <Input
              v-model:value="record[column.dataIndex]"
              @change="handleChange(index)"
              @blur="handleBlur(record, column.dataIndex)"
              size="small"
            />
          </div>
          <div
            v-else
            class="text-param"
            :class="record.selected ? '' : 'text-placeholder'"
            @click="handleClick(record, column.dataIndex)"
          >
            <span>{{ index !== parameters.length - 1 ? text : column.dataIndex }}</span>
          </div>
        </template>
        <template v-else-if="index !== parameters.length - 1">
          <Icon icon="ant-design:lock-filled" v-if="record['required']" />
          <a @click="handleClose(index)" v-else>
            <Icon icon="ant-design:close-outlined" />
          </a>
        </template>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Table, Input, Checkbox } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { KVD, Request } from '/#/store';

  export default defineComponent({
    name: 'Parameters',
    components: {
      Table,
      Input,
      Checkbox,
      Icon,
    },
    props: {
      data: {
        type: Object,
      },
    },

    setup(props) {
      const columns = [
        {
          title: '',
          dataIndex: 'selected',
          width: '6%',
          alias: 'center',
        },
        {
          title: 'KEY',
          dataIndex: 'keys',
          width: '30%',
        },
        {
          title: 'VALUE',
          dataIndex: 'value',
          width: '30%',
        },
        {
          title: 'DESCRIPTION',
          dataIndex: 'desc',
          width: '30%',
        },
        {
          title: 'ACTION',
          dataIndex: 'action',
          width: '4%',
          align: 'center',
        },
      ];

      let { path, url, parameters } = props.data as Request;

      const pushItem = () => {
        parameters.push({
          in: 'query',
          required: false,
          selected: true,
          keys: '',
          value: '',
          doc: '',
          edited: [],
        });
      };

      if (props.data) {
        if (parameters.length === 0) {
          pushItem();
        }
      }

      const handleClick = (record: KVD, dataIndex: string) => {
        if (record['in'] === 'path' && dataIndex === 'keys') {
          return;
        }
        record['edited'].push(dataIndex);
      };

      const handleBlur = (record: KVD, dataIndex: string) => {
        record['edited'].splice(record['edited'].indexOf(dataIndex), 1);
      };

      const handleChange = (index: number) => {
        if (index === parameters.length - 1) {
          pushItem();
        }

        let query: string[] = [];
        for (let item of parameters) {
          if (item.in === 'query' && item.keys !== '') {
            query.push(`${item.keys}=${item.value}`);
          }
        }
        url = path + '?' + query.join('&');
      };

      const handleClose = (index: number) => {
        parameters.splice(index, 1);
      };

      return {
        columns,
        url,
        parameters,
        handleClick,
        handleBlur,
        handleChange,
        handleClose,
      };
    },
  });
</script>

<style lang="less" scoped>
  .ant-table-row {
    .icon {
      visibility: hidden;
      margin-right: 10px;
    }

    &:hover {
      .icon {
        visibility: visible;
        margin-right: 10px;
      }
    }
  }

  .check-box {
    text-align: right;
  }

  .text-param {
    min-height: 25px;
  }

  .text-placeholder {
    color: #999;
  }
</style>
