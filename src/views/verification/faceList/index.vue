<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.validation',
        'menu.validation.faceverify',
        'menu.validation.faceverify.thirdpartyplatform',
      ]"
    />
    <a-card class="general-card" :title="$t('menu.validation.faceverify')">
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
                <a-form-item field="applicantId" label="申请者id">
                  <a-input
                    v-model="formModel.applicantId"
                    placeholder="请输入申请者id"
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
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          
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
        <!-- <template #operations="{ record }">
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
        </template> -->
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { getThirdPartyPlatformListByQuery } from '@/api/verification';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const loading = ref(false);
  const columns = [
    {
      title: '申请者id',
      dataIndex: 'applicantId',
    },
    {
      title: '应用id',
      dataIndex: 'applicationId',
    },
    {
      title: '第三方平台名称',
      dataIndex: 'newThird_party_platform',
    },
    {
      title: '验证状态',
      dataIndex: 'newVerificationStatus',
    },
    {
      title: '验证值',
      dataIndex: 'verificationValue',
    },
  ];
  const state = reactive({
    list: [],
  });
  const generateFormModel = () => {
    return {
      applicantId: '',
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
  // const onDelete = async (id: string) => {
  //   await cfDepartmentDelete({ params: { id } });
  //   fetchData();
  // };
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
  const getVerificationStatusText = (value: number) => {
    let name = '';
    switch (value) {
      case 0:
        name = '验证中';
        break;
      case 1:
        name = '验证成功';
        break;
      case 2:
        name = '验证失败';
        break;
      default:
        name = '-';
        break;
    }
    return name;
  };

  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getThirdPartyPlatformListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        applicantId: formModel.value.applicantId,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newVerificationStatus = getVerificationStatusText(
          i.verificationStatus
        );
        i.newThird_party_platform =
          i.third_party_platform === 'aliyun'
            ? '阿里云'
            : i.third_party_platform === 'tencent'
            ? '腾讯'
            : i.third_party_platform === '百度'
            ? '百度'
            : '-';
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
