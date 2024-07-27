<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.wisdomcommunity',
        'menu.wisdomcommunity.village',
        'menu.wisdomcommunity.villageresident.list',
      ]"
    />
    <a-card
      class="general-card"
      :title="$t('menu.wisdomcommunity.villageresident.list')"
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
                <a-form-item field="userTrueName" label="姓名">
                  <a-input
                    v-model="formModel.userTrueName"
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
              <a-col :span="8">
                <a-form-item field="checkStatus" label="小区名称">
                  <a-select
                    v-model="formModel.checkStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in checkStatusArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
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
      <a-row style="margin-bottom: 16px">
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
      </a-row>
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
        <template #faceImageUrl="{ record }">
          <a-image
            width="38"
            height="38"
            :src="record.faceImageUrl"
            v-if="record.faceImageUrl"
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
            <a-button type="primary" size="mini" @click="handleEdit(record)"
              >编辑</a-button
            >
            <a-button type="primary" size="mini" @click="handleCopy(record.id)"
              >复制id</a-button
            >
          </a-space>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import {
    getResidentListByQuery,
    deleteResident,
  } from '@/api/wisdomCommunity';
  import editAdd from './editAdd.vue';
  import { parseTime } from '@/utils/index';
  import { copyText } from '@/utils/copyText';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const editAddRef = ref();
  const columns = [
    {
      title: '姓名',
      dataIndex: 'userTrueName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '小区名称',
      dataIndex: 'villageName',
    },
    {
      title: '居民类型',
      dataIndex: 'newResidentType',
    },
    {
      title: '审核状态',
      dataIndex: 'newCheckStatus',
    },
    {
      title: '楼层',
      dataIndex: 'floor',
    },
    {
      title: '门牌号',
      dataIndex: 'houseNumber',
    },
    {
      title: '楼栋单元',
      dataIndex: 'unit',
    },
    {
      title: '人脸识别实体ic卡号',
      dataIndex: 'newFaceIcCard',
    },
    {
      title: '入住时间',
      dataIndex: 'newCheckInTime',
    },
    {
      title: '到期时间',
      dataIndex: 'newExpirationTime',
    },
    {
      title: '图片',
      dataIndex: 'faceImageUrl',
      slotName: 'faceImageUrl',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const residentTypeArr = [
    { value: 1, label: '业主' },
    { value: 2, label: '个人租户' },
    { value: 3, label: '办公' },
  ];
  const checkStatusArr = [
    { value: 1, label: '待审核' },
    { value: 2, label: '正常' },
    { value: 3, label: '审核不通过' },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      userTrueName: '',
      villageName: '',
      checkStatus: '',
    };
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
  });
  const handleCopy = (id: number) => {
    copyText(id);
  };
  const getLabelFromValue = (value: any, arr: any) => {
    const item = arr.find((obj) => obj.value === value);
    return item ? item.label : 'Label not found';
  };
  const pageChange = (e: number) => {
    pagination.current = e;
    fetchData();
  };
  const handleAdd = () => {
    editAddRef.value.handleClick();
  };
  const handleEdit = (e: any) => {
    editAddRef.value.handleClick(e);
  };
  const search = () => {
    fetchData();
  };
  const onDelete = async (residentId: string) => {
    await deleteResident({ params: { residentId } });
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
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getResidentListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        userTrueName: formModel.value.userTrueName,
        villageName: formModel.value.villageName,
        checkStatus: formModel.value.checkStatus,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newResidentType = getLabelFromValue(i.residentType, residentTypeArr);
        i.newCheckStatus = getLabelFromValue(i.checkStatus, checkStatusArr);
        i.newExpirationTime = parseTime(i.expirationTime);
        i.newCheckInTime = parseTime(i.checkInTime);
        i.newFaceIcCard = i.faceIcCard || '-'
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
