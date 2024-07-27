<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.ucenter', 'menu.ucenter.ad', 'menu.ucenter.ad.adlist']"
    />
    <a-card class="general-card" :title="$t('menu.user.list.searchTable')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 4 }"
            :wrapper-col-props="{ span: 8 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="id"
                  label="编号"
                >
                  <a-input
                    v-model="formModel.id"
                    placeholder="请输入广告id搜索"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="materialType"
                  label="素材类型"
                >
                <a-select
                    v-model="formModel.materialType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="0">图片</a-option>
                    <a-option value="1">视频</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="平台" field="platform" required>
                  <a-select
                    v-model="formModel.platform"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="wx_web">微信公众号</a-option>
                    <a-option value="wx_mp">微信小程序</a-option>
                    <a-option value="wx_app">微信app</a-option>
                    <a-option value="ali_web">阿里公众号</a-option>
                    <a-option value="ali_mp">阿里小程序</a-option>
                    <a-option value="ali_app">阿里app</a-option>
                    <a-option value="hardware_advertising_screen">硬件广告屏</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="appid"
                  label="应用id"
                >
                  <a-input
                    v-model="formModel.appid"
                    placeholder="例如小程序appid等"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="uid"
                  label="广告主人"
                >
                  <a-input
                    v-model="formModel.phone"
                    placeholder="请输入手机号"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
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
        <template #avatarUrl="{ record }">
          <a-avatar v-if="record.avatarUrl">
            <img alt="avatar" :src="record.avatarUrl" />
          </a-avatar>
          <a-avatar v-else :style="{ backgroundColor: '#14a9f8' }"
            >暂无</a-avatar
          >
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
          </a-space>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { getAdListByQuery, cfUserDelete, cfRoleGet } from '@/api/user';
  import editAdd from './editAdd.vue';
  import { parseTime } from '@/utils/index';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const roleList = ref([]);
  const loading = ref(false);
  const editAddRef = ref();
  const platformOptions = [
    {
      label: '微信公众号',
      value: 'wx_web',
    },
    {
      label: '微信小程序',
      value: 'wx_mp',
    },
    {
      label: '微信app',
      value: 'wx_app',
    },
    {
      label: '阿里公众号',
      value: 'ali_web',
    },
    {
      label: '阿里小程序',
      value: 'ali_mp',
    },
    {
      label: '阿里app',
      value: 'ali_app',
    },
    {
      label: '硬件广告屏',
      value: 'hardware_advertising_screen',
    }
  ];
  const columns = [
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    // },
    {
      title: '广告标题',
      dataIndex: 'title',
    },
    {
      title: '封面',
      dataIndex: 'cover',
    },
    {
      title: '素材类型',
      dataIndex: 'materialTypeTitle',
    },
    {
      title: '平台',
      dataIndex: 'platformName',
    },
    {
      title: '排序',
      dataIndex: 'sortIndex',
    },
    {
      title: '应用名称',
      dataIndex: 'applicationName',
    },
    {
      title: '配置值',
      dataIndex: 'sourceAddress',
    },
    {
      title: '展示次数',
      dataIndex: 'showCounts',
    },
    {
      title: '点击次数',
      dataIndex: 'clikCounts',
    },
    {
      title: '开始投放',
      dataIndex: 'startTimeStr',
    },
    {
      title: '结束投放',
      dataIndex: 'endTimeStr',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      id: '',
      nickName: '',
      phone: '',
      sex: '',
      userName: '',
      roleId: '',
    };
  };
  const getRole = async () => {
    // @ts-ignore
    const { data, code } = await cfRoleGet({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      roleList.value = data;
    }
  };
  const formModel = ref(generateFormModel());

  onMounted(() => {
    fetchData();
    getRole();
  });

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
  const reset = () => {
    formModel.value = generateFormModel();
  };
  const onDelete = async (id: string) => {
    await cfUserDelete({ params: { id } });
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
    const { data, code, total } = await getAdListByQuery({
      params: {
        page: pagination.current,
        size: pagination.pageSize,
        ...checkParams(formModel.value),
      },
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const adIndex in data) {
        for(const platformIndex in platformOptions){
          if(data[adIndex].platform==platformOptions[platformIndex].value){
            data[adIndex].platformName = platformOptions[platformIndex].label;
          }
        }
        if(data[adIndex].materialType==0){
          data[adIndex].materialTypeTitle = '图片';
        }else{
          data[adIndex].materialTypeTitle = '视频';
        }
        data[adIndex].startTimeStr = parseTime(data[adIndex].startTime);
        data[adIndex].endTimeStr = parseTime(data[adIndex].endTime);
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
