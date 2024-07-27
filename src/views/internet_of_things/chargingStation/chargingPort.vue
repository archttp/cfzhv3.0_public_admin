<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false">
      <template #title>
        {{ parametersData.deviceName + ' 充电口' }}
      </template>
      <a-button
        type="primary"
        @click="handlePortAdd"
        style="margin-bottom: 16px"
        >新增</a-button
      >
      <a-table
        row-key="id"
        :columns="columns"
        :data="list"
        :pagination="pagination"
        :loading="tableLoading"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm
              content="您确定删除吗？"
              @ok="onPortDelete(record.id)"
            >
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handlePortEdit(record)"
              >编辑</a-button
            >
            <a-button type="primary" size="mini" @click="createExitCode(record)"
              >生成码</a-button
            >
          </a-space>
        </template>
      </a-table>
    </a-modal>

    <a-modal
      v-model:visible="visible2"
      :width="1000"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="充电设备id"
                  field="chargingDeviceId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.chargingDeviceId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="充电口编号"
                  field="portNo"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.portNo"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="排序序号"
                  field="sortIndex"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.sortIndex"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="状态"
                  field="status"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">空闲</a-option>
                    <a-option :value="1">已连接</a-option>
                    <a-option :value="2">充电中</a-option>
                    <a-option :value="3">故障</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="充电类型" field="chargingType">
                  <a-select
                    placeholder="请选择"
                    allow-clear
                    v-model="formData.chargingType"
                  >
                    <a-option :value="0">两轮电动车</a-option>
                    <a-option :value="1">三轮电动车</a-option>
                    <a-option :value="2">四轮电动汽车</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-space>
        <div class="actions">
          <a-space>
            <a-button @click="resetFields"> 重置 </a-button>
            <a-button type="primary" @click="onSubmitClick"> 保存 </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="visible3"
      :footer="false"
      :width="800"
      @close="createExitCodeFormClose"
    >
      <img
        v-if="createCodeImage"
        :src="createCodeImage"
        style="width: 300px; height: 300px"
      />
      <a-radio-group v-model="urlValue" :options="plainOptions" @change="radioGroupChange">
        <template #label="{ data }">
          <a-tag>{{ data.label }}</a-tag>
        </template>
      </a-radio-group>
      <a-form
        ref="createExitCodeFormRef"
        layout="vertical"
        :model="createExitCodeFormData"
      >
        <a-form-item
          label="地址"
          field="text"
          validate-trigger="input"
          required
        >
          <a-input
            v-model="createExitCodeFormData.text"
            placeholder="请输入"
            allow-clear
          ></a-input>
        </a-form-item>
        <div class="actions">
          <a-space>
            <!-- <a-button @click="resetFields"> 重置 </a-button> -->
            <a-button
              :loading="createCodeloading"
              type="primary"
              @click="onStartCreateCode"
            >
              点击创建
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import {
    chargingPortGet,
    chargingPortAdd,
    chargingPortDelete,
    chargingPortUpdate,
    createTempQrCode,
  } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import { urlToBase64 } from '@/utils';
  import qrcodeIconImg from '@/assets/images/qrcode-icon.png';
  const _loginQcodeText = import.meta.env.VITE_LOGIN_QRCODE_TEXT;
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const visible2 = ref(false);

  // 生成码数据
  const visible3 = ref(false);
  const createCodeImage = ref('');
  const createExitCodeFormData = ref({
    height: '300',
    text: '',
    width: '300',
    logoText: _loginQcodeText,
    logoIconBase64: ''
  });
  const urlValue = ref(apiHost+'/scene/bcc/');
  const plainOptions = [
    { label: '二轮电动车', value: apiHost+'/scene/bcc/' },
    { label: '四轮电动车', value: apiHost+'/scene/evc/' },
  ];
  const createCodeloading = ref(false);
  const chargingStationId = ref('');
  const id_value = ref('');

  const tableLoading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    chargingDeviceId: '',
    portNo: '',
    sortIndex: '',
    status: '',
    id: '',
    chargingType: '',
  });
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const columns = [
    {
      title: '充电口编号',
      dataIndex: 'portNo',
    },
    {
      title: '排序序号',
      dataIndex: 'sortIndex',
    },
    {
      title: '状态',
      dataIndex: 'newStatus',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const parametersData = ref({
    deviceName: '',
    id: '',
  });
  const list = ref([]);

  const radioGroupChange = (e: any) => {
    createExitCodeFormData.value.text = `${e}${chargingStationId.value}-${id_value.value}`;
  }
  const onStartCreateCode = async () => {
    createCodeloading.value = true;

    let base64 = urlToBase64(qrcodeIconImg);
    base64.then(async (resolve)=>{
      createExitCodeFormData.value.logoIconBase64 = resolve.substr(resolve.indexOf(',')+1)
      const { data, code } = await createTempQrCode(createExitCodeFormData.value);
      console.log(data, code);
      if (code == 10002) {
        createCodeImage.value = 'data:image/png;base64,' + data;
      }
      createCodeloading.value = false;
    })
  };
  const createExitCodeFormClose = () => {
    createExitCodeFormData.value.text = '';
    createCodeImage.value = '';
  };
  const createExitCode = (row: any) => {
    chargingStationId.value = row.chargingStationId
    id_value.value = row.id
    createExitCodeFormData.value.text = `${urlValue.value}${row.chargingStationId}-${row.id}`;
    visible3.value = true;
  };

  const fetchData = async () => {
    tableLoading.value = true;
    // @ts-ignore
    const { data, code, total } = await chargingPortGet({
      params: checkParams({
        page: 1,
        size: 200,
        chargingDeviceId: parametersData.value.id,
      }),
    });
    tableLoading.value = false;
    if (code === 10002) {
      for (const i of data) {
        i.newStatus = getStatusText(i.status);
      }
      list.value = data;
    } else {
      list.value = [];
    }
  };

  const handleClick = (e: any = null) => {
    parametersData.value = e;
    fetchData();
    visible.value = true;
  };
  const handlePortAdd = () => {
    formData.value.chargingDeviceId = parametersData.value.id;
    visible2.value = true;
  };
  const onPortDelete = async (id: any) => {
    await chargingPortDelete({ params: { id } });
    fetchData();
  };
  const handlePortEdit = (e: any) => {
    formData.value = e;
    visible2.value = true;
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
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
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return '空闲';
      case 1:
        return '已连接';
      case 2:
        return '充电中';
      case 3:
        return '故障';
      default:
        return '未知状态';
    }
  };

  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await chargingPortUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible2.value = false;
          Message.success('更新成功!');
          fetchData();
        }
      } else {
        const { code } = await chargingPortAdd(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible2.value = false;
          Message.success('添加成功!');
          fetchData();
        }
      }
    });
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
</style>
