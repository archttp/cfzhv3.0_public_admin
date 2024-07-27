<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.wisdomcommunity',
        'menu.wisdomcommunity.village',
        'menu.wisdomcommunity.villageappointmentvisitrecord.list',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.wisdomcommunity.villageappointmentvisitrecord.list')"
    >
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="formUserName" label="申请者姓名">
                  <a-input
                    v-model="formModel.formUserName"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="villageName" label="小区名称">
                  <a-input
                    v-model="formModel.villageName"
                    placeholder="请输入"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 40px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <!-- <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button> -->
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <!-- <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row> -->
      <a-table
        row-key="id"
        :columns="columns"
        :data="state.list"
        :style="{ height: '700px' }"
        :pagination="pagination"
        :loading="loading"
        @page-change="pageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #inSmallImageUrl="{ record }">
          <a-image
            width="38"
            height="38"
            :src="record.inSmallImageUrl"
            v-if="record.inSmallImageUrl"
          />
          <span v-else>暂无数据</span>
        </template>
        <template #formUserFaceImageUrl="{ record }">
          <a-image
            width="38"
            height="38"
            :src="record.formUserFaceImageUrl"
            v-if="record.formUserFaceImageUrl"
          />
          <span v-else>暂无数据</span>
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
            <!-- <a-button type="primary" size="mini" @click="handleEdit(record)"
              >编辑</a-button
            > -->
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import {
    getVillageAppointmentVisitRecordListByQuery,
    deleteVillageAppointmentVisitRecord,
  } from '@/api/wisdomCommunity';
  import { parseTime } from '@/utils/index';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const columns = [
    {
      title: '申请人姓名',
      dataIndex: 'formUserName',
    },
    {
      title: '到访业主姓名',
      dataIndex: 'toUserName',
    },
    {
      title: '小区名称',
      dataIndex: 'villageName',
    },
    {
      title: '楼栋名称',
      dataIndex: 'villageBuildingName',
    },
    {
      title: '单元',
      dataIndex: 'unit',
    },
    {
      title: '到访楼层',
      dataIndex: 'floor',
    },
    {
      title: '到访门牌号',
      dataIndex: 'houseNumber',
    },
    {
      title: '到访原因',
      dataIndex: 'reason',
    },
    {
      title: '审核人姓名',
      dataIndex: 'processUserName',
    },
    {
      title: '审核状态',
      dataIndex: 'newProcessStatus',
    },

    {
      title: '申请人图片',
      dataIndex: 'formUserFaceImageUrl',
      slotName: 'formUserFaceImageUrl',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const recognitionModes = [
    { value: 0, label: '人脸' },
    { value: 1, label: 'IC卡' },
    { value: 2, label: 'IC卡，身份证或人脸' },
    { value: 3, label: '人脸+卡识别，双重认证' },
    { value: 4, label: '身份证+人脸，双重认证(人证)' },
    { value: 5, label: '身份证+人脸+白名单，三重认证' },
    { value: 6, label: '人脸或人证模式' },
  ];
  // const recognitionModes = [
  //   { value: 0, label: '人脸' },
  //   { value: 1, label: 'IC卡' },
  //   { value: 2, label: 'IC卡，身份证或人脸' },
  //   { value: 3, label: '人脸+卡识别，双重认证' },
  //   { value: 4, label: '身份证+人脸，双重认证(人证)' },
  //   { value: 5, label: '身份证+人脸+白名单，三重认证' },
  //   { value: 6, label: '人脸或人证模式' },
  // ];
  const releaseTypeArr = [
    { value: 0, label: '人脸' },
    { value: 0, label: '未放行' },
    { value: 1, label: '自动放行' },
    { value: 1, label: '人工放行' },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      formUserName: '',
      villageName: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });

  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const search = () => {
    fetchData();
  };
  const onDelete = async (id: string) => {
    await deleteVillageAppointmentVisitRecord({ params: { id } });
    fetchData();
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
  const getVisitorType = (value: any) => {
    switch (value) {
      case 0:
        return '临时访客';
      case 1:
        return '业主';
      case 2:
        return '租户';
      case 3:
        return '办公';
      default:
        return '未知身份';
    }
  };

  const getRecognitionModeText = (number: any) => {
    const mode = recognitionModes.find((mode) => mode.value === number);
    return mode ? mode.label : '未知';
  };
  const getReleaseTypeText = (number: any) => {
    const mode = releaseTypeArr.find((mode) => mode.value === number);
    return mode ? mode.label : '未知';
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } =
      await getVillageAppointmentVisitRecordListByQuery({
        params: checkParams({
          page: pagination.current,
          size: pagination.pageSize,
          formUserName: formModel.value.formUserName,
          villageName: formModel.value.villageName,
        }),
      });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        // @ts-ignore
        i.newProcessStatus = {
          0: '待审核',
          1: '已审核',
          2: '已到访',
          3: '审核失败',
        }[i.processStatus];
      }
      state.list = data;
    } else {
      state.list = [];
    }
    // console.log(data, code, 999);
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
