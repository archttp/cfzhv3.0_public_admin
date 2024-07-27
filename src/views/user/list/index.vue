<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.ucenter', 'menu.ucenter.user', 'menu.ucenter.user.list']"
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
                  label="用户编号"
                >
                  <a-input
                    v-model="formModel.id"
                    placeholder="请输入用户id搜索"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="nickName"
                  :label="$t('searchTable.form.nickName')"
                >
                  <a-input
                    v-model="formModel.nickName"
                    :placeholder="$t('searchTable.form.nickName.placeholder')"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="userName"
                  :label="$t('searchTable.form.userName')"
                >
                  <a-input
                    v-model="formModel.userName"
                    :placeholder="$t('searchTable.form.userName.placeholder')"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="phone"
                  :label="$t('searchTable.form.phone')"
                >
                  <a-input
                    v-model="formModel.phone"
                    :placeholder="$t('searchTable.form.phone.placeholder')"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="sex" :label="$t('searchTable.form.sex')">
                  <a-select
                    v-model="formModel.sex"
                    :options="contentTypeOptions"
                    :placeholder="$t('searchTable.form.sex')"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="角色" field="roleId">
                  <a-select
                    v-model="formModel.roleId"
                    placeholder="请选择角色"
                    allow-clear
                    :on-change="getRole"
                  >
                    <a-option
                      v-for="item in roleList"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
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
  import { cfUserGetListByQuery, cfUserDelete, cfRoleGet } from '@/api/user';
  import editAdd from './editAdd.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const roleList = ref([]);
  const loading = ref(false);
  const editAddRef = ref();
  const contentTypeOptions = [
    {
      label: '保密',
      value: 0,
    },
    {
      label: '男',
      value: 1,
    },
    {
      label: '女',
      value: 2,
    },
  ];
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '账号',
      dataIndex: 'userName',
    },
    {
      title: '用户名',
      dataIndex: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '性别',
      dataIndex: 'newSex',
    },
    {
      title: 'Email',
      dataIndex: 'newEmail',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      slotName: 'avatarUrl',
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
    const { data, code, total } = await cfUserGetListByQuery({
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
      for (const i in data) {
        // eslint-disable-next-line no-nested-ternary
        data[i].newSex =
          // eslint-disable-next-line no-nested-ternary
          data[i].sex === 0 ? '保密' : data[i].sex === 1 ? '男' : '女';
        data[i].newEmail = data[i].email || '-';
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
