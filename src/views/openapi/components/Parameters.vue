<template>
  <div>
    <h1>Query Params</h1>
    <Table :columns="columns" :data-source="data" size="small" :pagination="false" bordered>
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.dataIndex === 'selected'">
          <div class="check-box" v-if="index !== data.length - 1">
            <span class="icon"><Icon icon="ant-design:swap-outlined" /></span>
            <Checkbox v-model:checked="record[column.dataIndex]" />
          </div>
        </template>
        <template v-else-if="column.dataIndex !== 'action'">
          <div v-if="editableData[index].get(column.dataIndex)">
            <Input
              v-model:value="record[column.dataIndex]"
              @change="handleChange(index)"
              @blur="editableData[index].set(column.dataIndex, false)"
              size="small"
            />
          </div>
          <div
            class="text-param"
            :class="record.selected ? '' : 'text-placeholder'"
            v-else
            @click="editableData[index].set(column.dataIndex, true)"
            >{{ index !== data.length - 1 ? text : column.dataIndex }}
          </div>
        </template>
        <template v-else-if="index !== data.length - 1">
          <a @click="handleClose(index)">
            <Icon class="icon" icon="ant-design:close-outlined" />
          </a>
        </template>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, watch } from 'vue';
  import { Table, Input, Checkbox } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';

  export interface DataItem {
    selected: boolean;
    keys: string;
    value: string;
    desc: string;
  }

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
        type: Array,
        default: () => {
          return [
            {
              selected: false,
              keys: '',
              value: '',
              desc: '',
            },
          ];
        },
      },
    },
    emits: ['change'],

    setup(props, context) {
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

      // const data: Ref<DataItem[]> = ref([
      //   {
      //     selected: false,
      //     keys: '',
      //     value: '',
      //     desc: '',
      //   },
      // ]);

      const editableData: Ref<Array<Map<string, boolean>>> = ref([
        new Map<string, boolean>([
          ['keys', false],
          ['value', false],
          ['desc', false],
        ]),
      ]);

      // watch(
      //   () => props.data,
      //   (val) => {
      //     console.log(val);
      //   },
      // );

      // watch(data.value, (val) => {
      //   let value = val as DataItem[];
      //   let params: Array<string> = [];
      //   for (let item of value.slice(0, value.length - 1)) {
      //     let dataItem = item as DataItem;
      //     if (dataItem.selected && dataItem.keys !== '') {
      //       params.push(`${dataItem.keys}=${dataItem.value}`);
      //     }
      //   }
      //   if (params) {
      //     context.emit('change', params.join('&'));
      //   }
      // });

      const handleClick = (index: number, dataIndex: string) => {
        editableData.value[index].set(dataIndex, true);
      };

      const handleBlur = (index: number, dataIndex: string) => {
        editableData.value[index].set(dataIndex, false);
      };

      const handleChange = (index: number) => {
        if (index === props.data.length - 1) {
          (props.data as DataItem[]).push({
            selected: false,
            keys: '',
            value: '',
            desc: '',
          });
          editableData.value.push(
            new Map<string, boolean>([
              ['keys', false],
              ['value', false],
              ['desc', false],
            ]),
          );
        }
        (props.data as DataItem[])[index].selected = true;
      };

      const handleClose = (index: number) => {
        (props.data as DataItem[]).splice(index, 1);
        editableData.value.splice(index, 1);
      };

      return {
        columns,
        // data,
        editableData,
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
      display: none;
      margin-right: 10px;
    }

    &:hover {
      .icon {
        display: inline;
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
