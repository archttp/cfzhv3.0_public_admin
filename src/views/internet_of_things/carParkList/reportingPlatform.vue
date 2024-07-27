<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title> {{ modalTitle }} - 平台 </template>
      <a-button type="primary" @click="onShowEditModal" style="margin-bottom: 16px">
        新增
      </a-button>
      <a-table row-key="id" :columns="columns" :data="list" :style="{ height: '700px' }" :loading="loading">
        <template #operations="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="onShowEditModal(record)">编辑</a-button>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template></a-table>
    </a-modal>

    <a-modal v-model:visible="visible2" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title> {{ formData.id ? '编辑' : '新增' }} 平台 </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-col>
                  <a-form-item label="停车场" field="carParkId" required>
                    <a-select :loading="loading" placeholder="请输入" allow-search allow-clear @search="handleSelectSearch"
                      :disabled="!!formData.id" :filter-option="false" v-model="formData.carParkId">
                      <a-option v-for="item of parkList" :value="item.id">{{
                        item.name
                      }}</a-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="上报平台"
                  field="platformId"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.platformId"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.id"
                      v-for="item in platformArr"
                      :key="item.id"
                      >{{ item.platformName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  label="配置"
                  field="configParams"
                  validate-trigger="input"
                  required
                >
                <json-editor-vue class="editor" v-model="formData.configParams" />
                </a-form-item>
              </a-col> -->
            </a-row>
            <a-row :gutter="80">
              <a-col :span="24">
                <a-form-item label="配置(Json格式) 请输入json格式 例如：{a:1,b:1}" field="configParams" validate-trigger="input" required>
                  <!-- <div v-for="item in formData.configParams">
                    <a-space>
                      <a-col :span="12">
                        <label for="valueInput">Key:</label>
                        <a-input placeholder="Key"></a-input>
                      </a-col>
                      <a-col :span="12"> <label for="valueInput">Value:</label><a-input
                          placeholder="Value"></a-input></a-col>
                      <a-col><a-button>+</a-button></a-col>
                    </a-space>
                  </div> -->
                  <!-- <json-editor-vue
                    class="editor"
                    v-model="formData.configParams"
                  /> -->
                  <!-- <a-input
                    v-model="formData.configParams"
                    placeholder="请输入"
                    allow-clear
                  ></a-input> -->
                  <a-textarea placeholder="请输入json格式 例如：{a:1,b:1}" allow-clear show-word-limit
                    v-model="formData.configParams" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-space>
        <div class="actions">
          <a-space>
            <a-button @click="resetFields"> 重置 </a-button>
            <a-button type="primary" :loading="loading" @click="onSubmitClick">
              保存
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  getLinkPlatformListByQuery,
  deleteLinkPlatform,
  addLinkPlatform,
  cfCarParkSearch,
  updateLinkPlatform,
  getCarParkDataReportingPlatformListByQuery
} from '@/api/internetOfThings';
import { Message } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash';
import { parseTime } from '@/utils';
import { cfPaymentAgencyGet } from '@/api/pay';
// import JsonEditorVue from 'json-editor-vue3';

// @ts-ignore
const visible = ref(false);
const visible2 = ref(false);
const list = ref([]);
const platformArr = ref([]);
const loading = ref(false);
const selectLoading = ref(false);
const modalTitle = ref('');
const parkList = ref([]);
const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const columns = [
  {
    title: '停车场id',
    dataIndex: 'carParkId',
  },
  {
    title: '平台id',
    dataIndex: 'platformId',
  },
  {
    title: '平台',
    dataIndex: 'platformName',
  },
  {
    title: '配置',
    dataIndex: 'configParams',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
];
const formData = ref({
  carParkId: '',
  configParams: '',
  platformId: '',
  id: '',
});
const shopId = ref('');
// 编辑窗口事件
const onShowEditModal = (record: any) => {
  const newRecord = cloneDeep(record);
  // if (newRecord.configParams) {
  //   newRecord.configParams = JSON.parse(record.configParams);
  // }
  formData.value = newRecord;
  visible2.value = true;
};
const handleSelectSearch = async (value: any) => {
  if (value) {
    selectLoading.value = true;
    const { data, code } = await cfCarParkSearch({
      params: {
        name: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      parkList.value = data;
    } else {
      parkList.value = [];
    }
  } else {
    parkList.value = [];
  }
};
const fetchDataPplatform = async () => {
    // @ts-ignore
    const { data, code } =
      await getCarParkDataReportingPlatformListByQuery({
        params: checkParams({
          page: 1,
          size: 200
        }),
      });
    if (code === 10002) {
      // @ts-ignore
      platformArr.value = data;
    } else {
      platformArr.value = [];
    }
    // console.log(data, code, 999);
  };
const checkParams = (obj: any) => {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in obj) {
      if (!obj[i]) {
        if (obj[i] !== 0) {
          obj[i] = null;
        }
      }
    }
    return obj;
  };
const validate = async (editor: any) => {
  const res = await editor.validate();
  // res 是错误列表，如果是空数组，则表示检测没有错误
  console.log(res);
};
const onSubmitClick = () => {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (valid: any) => {
    if (valid) return false;
    const newForm = cloneDeep(formData.value);
    if (newForm.configParams) {
      newForm.configParams = JSON.stringify(formData.value.configParams);
    }
    if (formData.value.id) {
      const { code } = await updateLinkPlatform(newForm);
      if (code === 10002) {
        resetFields();
        visible2.value = false;
        Message.success('更新成功!');
        getList();
      }
    } else {
      const { code } = await addLinkPlatform(newForm);
      if (code === 10002) {
        resetFields();
        visible2.value = false;
        Message.success('添加成功!');
        getList();
      }
    }
  });
};

// 用于处理返回的字段 为 '0' 的情况
const formatTime = (time: any) => {
  console.log(time, 'timeeeee');

  if (time === '0' || !time || time === '-') {
    return '';
  } else {
    return parseTime(time);
  }
};
const onDelete = async (id: string) => {
  await deleteLinkPlatform({ params: { id } });
  getList();
};
const handleClick = (e: any = null) => {
  shopId.value = e.id;
  visible.value = true;
  modalTitle.value = e.name;
  fetchDataPplatform();
  getList();
};
const getList = async () => {
  const { data, code, total } = await getLinkPlatformListByQuery({
    params: {
      carParkId: shopId.value,
      page: 1,
      size: 200,
    },
  });
  if (code == 10002) {
    list.value = data;
  } else {
    list.value = [];
  }
};

const resetFields = () => {
  formRef.value.resetFields();
};

defineExpose({ handleClick });
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 40px 20px;
  overflow: hidden;
}

.actions {
  height: 60px;
  padding: 14px 20px 14px 0;
  background: var(--color-bg-2);
  text-align: right;
}

.editor {
  width: 100%;
  height: 388px;
}
</style>
