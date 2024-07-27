<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.chat', 'menu.chat.message', 'menu.chat.message.list']"
    />
    <a-card class="general-card" :title="$t('menu.chat.message.list')">
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
                <a-form-item field="contents" label="消息内容">
                  <a-input
                    v-model="formModel.contents"
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
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <!-- <a-space>
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
          </a-space> -->
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
        <template #contents="{ record }">
          <a-row style="align-items: center">
            <div class="singe-line" style="width: 160px">{{
              record.contents
            }}</div>
            <a-button
              style="margin-left: 8px"
              @click="showModal(record.contents)"
              >查看</a-button
            >
          </a-row>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="modalClose"
    >
      <div>{{ modalText }}</div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import { getUserMessageListByQuery, deleteUserMessage } from '@/api/chatApi';
  import editAdd from './editAdd.vue';

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const visible = ref(false);
  const loading = ref(false);
  const modalText = ref('');
  const editAddRef = ref();
  const columns = [
    {
      title: '内容',
      dataIndex: 'contents',
      ellipsis: true,
      width: 300,
      slotName: 'contents',
    },
    {
      title: '客户端',
      dataIndex: 'newClient',
    },
    {
      title: '状态',
      dataIndex: 'newStatus',
    },
    {
      title: '类型',
      dataIndex: 'newType',
    },
    {
      title: '发送者',
      dataIndex: 'fromUid',
    },
    {
      title: '接收者',
      dataIndex: 'toUid',
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
      contents: '',
    };
  };
  const formModel = ref(generateFormModel());
  const showModal = (value: string) => {
    modalText.value = value;
    visible.value = true;
  };
  const modalClose = () => {
    modalText.value = '';
  };
  onMounted(() => {
    fetchData();
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
  const onDelete = async (id: string) => {
    await deleteUserMessage({ params: { noticeConfigId: id } });
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
  const getClientText = (value: any) => {
    switch (value) {
      case 0:
        return 'app';
      case 1:
        return 'PC';
      case 2:
        return 'PC浏览器';
      case 3:
        return 'PC浏览器';
      default:
        return '未知';
    }
  };
  const getStatusText = (value: any) => {
    switch (value) {
      case 0:
        return '未读';
      case 1:
        return '已读';
      case 2:
        return '已撤回';
      case 3:
        return '违规消息';
      default:
        return '未知';
    }
  };
  const getTypeText = (value: any) => {
    switch (value) {
      case 0:
        return '文本';
      case 1:
        return '文件';
      case 2:
        return '视频';
      case 3:
        return '链接';
      default:
        return '未知';
    }
  };
  const fetchData = async () => {
    loading.value = true;
    // @ts-ignore
    const { data, code, total } = await getUserMessageListByQuery({
      params: checkParams({
        page: pagination.current,
        size: pagination.pageSize,
        contents: formModel.value.contents,
      }),
    });
    loading.value = false;
    if (code === 10002) {
      // @ts-ignore
      if (total) pagination.total = total;
      for (const i of data) {
        i.newClient = getClientText(i.client);
        i.newStatus = getStatusText(i.status);
        i.newType = getTypeText(i.type);
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
  .singe-line {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
  }
</style>
