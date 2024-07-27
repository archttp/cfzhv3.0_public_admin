<template>
  <a-card :bordered="false">
    <a-space :size="54">
      <!-- <a-image :src="avatar"></a-image> -->
      <a-avatar :size="68" v-if="avatar">
        <img alt="avatar" :src="avatar" />
      </a-avatar>
      <a-avatar :size="68" v-else> cFeng </a-avatar>
      <!-- <a-upload
        action="/"
        list-type="picture-card"
        :file-list="fileList"
        :show-upload-button="true"
        :show-file-list="false"
        @change="uploadChange"
      >
        <template #upload-button>
          <a-avatar :size="100" class="info-avatar">
            <template #trigger-icon>
              <icon-camera />
            </template>
            <img v-if="fileList.length" :src="fileList[0].url" />
          </a-avatar>
        </template>
      </a-upload> -->
      <a-descriptions
        :data="datas"
        title="基本信息"
        layout="inline-horizontal"
        :label-style="{
          fontWeight: 'normal',
        }"
        :value-style="{
          width: '120px',
          textAlign: 'left',
        }"
      />
      <!-- <a-descriptions
        :data="renderData"
        :column="2"
        align="right"
        layout="inline-horizontal"
        :label-style="{
          width: '100px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '100px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      >
        <template #label="{ label }">{{ $t(label) }} :</template>
        <template #value="{ value, data }">
          <a-tag
            v-if="data.label === 'userSetting.label.certification'"
            color="green"
            size="small"
          >
            已认证
          </a-tag>
          <span v-else>{{ value }}</span>
        </template>
      </a-descriptions> -->
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
  import { useUserStore } from '@/store';
  import { getMyInfo } from '@/api/user';
  import { Avatar } from '@arco-design/web-vue';

  const userInfo: any = ref({
    avatar: '',
  });
  const avatar = ref('');
  // const userStore = useUserStore();

  const datas = ref([]);

  // const file = {
  //   uid: '-2',
  //   name: 'avatar.png',
  //   url: userInfo.avatar,
  // };
  // const fileList = ref<FileItem[]>([file]);
  const fileList = ref([
    {
      url: '',
    },
  ]);
  // const uploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
  //   fileList.value = [fileItem];
  // };

  const getMyInfoFn = async () => {
    const { data, code } = await getMyInfo();
    console.log(333777, data);
    avatar.value = data.avatarUrl;
    // userInfo.value.avatar = data.avatar;
    if (code === 10002) {
      // @ts-ignore
      datas.value = [
        {
          label: '用户名',
          value: data.userName,
        },
        {
          label: '昵称',
          value: data.nickName,
        },
        {
          label: '手机号',
          value: data.phone,
        },
        {
          label: 'email',
          value: data.email || '-',
        },
        {
          label: '权限',
          value: data?.cfRole.name || '-',
        },
      ];
    }
  };

  onMounted(() => {
    getMyInfoFn();
  });
</script>

<style scoped lang="less">
  .arco-card {
    padding: 14px 0 4px 4px;
    border-radius: 4px;
  }
  :deep(.arco-avatar-trigger-icon-button) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: #e8f3ff;
    .arco-icon-camera {
      margin-top: 8px;
      color: rgb(var(--arcoblue-6));
      font-size: 14px;
    }
  }
</style>
