<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 管理人员 </template>
      <a-button type="primary" @click="handleAdd" style="margin-bottom: 16px">
        <template #icon>
          <icon-plus />
        </template>
        添加
      </a-button>
      <a-tabs
        v-model="tabsIndex"
        direction="vertical"
        style="height: 500px"
        size="large"
        @tab-click="tabClick"
        :editable="true"
        @delete="tabDelete"
      >
        <a-tab-pane
          :key="index"
          :title="item.userTrueName"
          v-for="(item, index) in list"
        >
          <a-input class="a-input-user-name" placeholder="点击此修改此用户显示名称" allow-clear v-model="linkerFormData.userTrueName">
            <template #prepend>
              {{ item.roleName }}
            </template>
            <template #append>
              <icon-refresh @click="updateLinker(item)" />
            </template>
          </a-input>
          
          <a-checkbox-group :model-value="managedArr" @change="checkBoxChange">
            <template v-for="item in pointList" :key="item.id">
              <a-checkbox :value="item.id">
                <template #checkbox="{ checked }">
                  <a-space
                    align="start"
                    class="custom-checkbox-card"
                    :class="{ 'custom-checkbox-card-checked': checked }"
                  >
                    <div className="custom-checkbox-card-mask">
                      <div className="custom-checkbox-card-mask-dot" />
                    </div>
                    <div>
                      <div className="custom-checkbox-card-title">
                        {{ item.name }}
                      </div>
                      <a-typography-text type="secondary">
                        方向：{{ item.positionDescribe }}
                      </a-typography-text>
                    </div>
                  </a-space>
                </template>
              </a-checkbox>
            </template>
          </a-checkbox-group>
        </a-tab-pane>
      </a-tabs>

      <!-- <a-table
        row-key="id"
        :columns="columns"
        :data="list"
        :style="{ height: '700px' }"
        :loading="loading"
      >
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
          </a-space>
        </template></a-table
      > -->
    </a-modal>
    <a-modal
      v-model:visible="editVisible"
      draggable
      :width="800"
      :footer="false"
      @close="resetFields"
    >
      <a-form ref="formRef" layout="vertical" :model="editFormData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="场地"
                  field="areaId"
                  validate-trigger="input"
                  required
                  disabled
                >
                  <a-input
                    v-model="editFormData.areaId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="场景"
                  field="scene"
                  validate-trigger="input"
                  disabled
                  required
                >
                  <a-select
                    v-model="editFormData.scene"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">通用</a-option>
                    <a-option :value="1">停车场</a-option>
                    <a-option :value="2">商城</a-option>
                    <a-option :value="3">充电</a-option>
                    <a-option :value="4">洗车</a-option>
                    <a-option :value="5">加油</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="用户" field="uid">
                  <a-select
                    v-model="editFormData.uid"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="手机号搜索"
                    allow-search
                    :filter-option="false"
                    @search="handleSearch"
                  >
                    <a-option
                      v-for="item of userList"
                      :key="item?.id"
                      :value="item?.id"
                      >{{ item.userName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="用户角色" field="role" required>
                  <a-select
                    v-model="editFormData.role"
                    placeholder="请选择角色"
                    allow-clear
                  >
                    <a-option value="security_staff">保安值守</a-option>
                    <a-option value="property_manager">物业经理</a-option>
                    <a-option value="project_finance">项目财务</a-option>
                    <a-option value="data_officer">数据员</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  label="用户id"
                  field="uid"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="editFormData.uid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col> -->
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="是否允许修改场地相关数据" field="allowEdit">
                  <a-select
                    v-model="editFormData.allowEdit"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="是否允许修改记录数据"
                  field="allowModifyLogData"
                >
                  <a-select
                    v-model="editFormData.allowModifyLogData"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="是否允许修改交易金额"
                  field="allowModifyTransactionAmount"
                >
                  <a-select
                    v-model="editFormData.allowModifyTransactionAmount"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
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
    <a-modal v-model:visible="tipsVisible" @ok="tipsHandleOk">
      <template #title> 提示 </template>
      <div>您确定删除该车场 - {{ deleteUserInfo.title }} - 管理人员吗？</div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    deleteShopAccountNumber,
    cfAreaLinkUser,
    cfAreaLinkUserAdd,
    cfCheckPointLinkUser,
    cfCheckPointLinkUserAdd,
    cfAreaLinkUserDelete,
    cfAreaLinkUserUpdate,
  } from '@/api/internetOfThings';
  import { cfCheckPointGet } from '@/api/park';
  import { cfUserQuicklySearchUser } from '@/api/user';
  import { Message, Modal } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import { parseTime } from '@/utils';

  const visible = ref(false);
  const editVisible = ref(false);
  const tipsVisible = ref(false);
  const list = ref([]);
  const loading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const managedArr = ref([]);
  const emit = defineEmits(['fetchData', 'fetch-data']);

  const columns = [
    {
      title: '机构名称',
      dataIndex: 'userPaymentAgencyName',
    },
    {
      title: '机构id',
      dataIndex: 'userPaymentAgencyId',
    },
    {
      title: '场景',
      dataIndex: 'newScene',
    },
    {
      title: '店铺id',
      dataIndex: 'shopId',
    },
    {
      title: '平台',
      dataIndex: 'platform',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const areaId = ref('');
  const userList = ref([]);
  const pointList = ref([]);
  const tabsIndex = ref(0);

  const editFormData = ref({
    allowEdit: '',
    allowModifyLogData: '',
    allowModifyTransactionAmount: '',
    areaId: '',
    roleKey: '',
    scene: 3,
    role: '',
    uid: '',
  });

  const linkerFormData = ref({
    id: '',
    userTrueName: '',
  });

  // 删除用户临时存数据用
  const deleteUserInfo = ref({
    title: '',
    id: '',
  });
  const handleAdd = () => {
    editFormData.value.areaId = areaId.value;
    editVisible.value = true;
  };
  const handleSearch = async (value: any) => {
    const { data, code } = await cfUserQuicklySearchUser({
      params: {
        phone: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      userList.value = data;
    } else {
      userList.value = [];
    }
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
    await deleteShopAccountNumber({ params: { id } });
    getList();
  };
  const handleClick = (e: any = null, title: any) => {
    console.log(e, 111);
    areaId.value = e;
    visible.value = true;
    modalTitle.value = title;
    getList();
    getAllPoint();
  };
  const tabClick = (e: any) => {
    tabsIndex.value = e;
    geInfo(list.value[e].uid);
  };
  const tabDelete = (key: any) => {
    deleteUserInfo.value.id = list.value[key].id;
    deleteUserInfo.value.title = list.value[key].userTrueName;
    tipsVisible.value = true;
  };
  const updateLinker = async (item: any) => {
    linkerFormData.value.id = item.id;
    if(!linkerFormData.value.id || !linkerFormData.value.userTrueName){
      return;
    }
    const { data, code } = await cfAreaLinkUserUpdate(linkerFormData.value);
    if(code===10002){
      linkerFormData.value.id = '';
      linkerFormData.value.userTrueName = '';
      getList()
    }
  };
  const tipsHandleOk = async () => {
    const { data, code } = await cfAreaLinkUserDelete({
      params: {
        id: deleteUserInfo.value.id,
      },
    });
    getList()
  };
  const convertNumberToText = (number: any) => {
    switch (number) {
      case 'carpark':
        return '停车';
      case 'charge':
        return '充电';
      case 'coupon_activity':
        return '优惠券活动';
      default:
        return '未知';
    }
  };
  const getAllPoint = async () => {
    const { data, code, total } = await cfCheckPointGet({
      params: {
        areaId: areaId.value,
        scene: 3,
        page: 1,
        size: 200,
      },
    });
    console.log('当前停车场的所有通道', data, code);
    if (code == 10002) {
      pointList.value = data;
    } else {
      pointList.value = [];
    }
  };
  const getList = async () => {
    const { data, code, total } = await cfAreaLinkUser({
      params: {
        areaId: areaId.value,
        scene: 3,
        page: 1,
        size: 200,
      },
    });
    console.log('用户', data, code);

    if (code == 10002) {
      // for (const i of data) {
      //   i.newScene = convertNumberToText(i.scene);
      // }
      list.value = data;
      geInfo(data[0].uid);
    } else {
      list.value = [];
    }
  };

  const geInfo = async (id: any) => {
    const { data, code, total } = await cfCheckPointLinkUser({
      params: {
        areaId: areaId.value,
        scene: 3,
        uid: id,
        page: 1,
        size: 200,
      },
    });

    if (code == 10002) {
      managedArr.value = data.map((i: any) => i.checkPointId);
    } else {
      managedArr.value = [];
    }
  };

  // 选项框发生改变
  const checkBoxChange = async (e: any) => {
    const { code, message } = await cfCheckPointLinkUserAdd({
      checkPointIds: e,
      scene: 1,
      uid: list.value[tabsIndex.value].uid,
      areaId: areaId.value,
    });
    if (code == 10002) {
      managedArr.value = e;
    } else {
      Message.error(message);
    }
  };

  const resetFields = () => {
    // editFormData.value.id = '';
    formRef.value.resetFields();
    editFormData.value.areaId = areaId.value;
    editFormData.value.scene = 3;
  };

  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      const { code } = await cfAreaLinkUserAdd(editFormData.value);
      if (code === 10002) {
        resetFields();
        editVisible.value = false;
        Message.success('添加成功!');
        getList();
        // emit('fetchData');
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

  .custom-checkbox-card {
    padding: 10px 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    width: 250px;
    box-sizing: border-box;
  }

  .custom-checkbox-card-mask {
    height: 14px;
    width: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: 1px solid var(--color-border-2);
    box-sizing: border-box;
  }

  .custom-checkbox-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  .custom-checkbox-card-title {
    color: var(--color-text-1);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .custom-checkbox-card:hover,
  .custom-checkbox-card-checked,
  .custom-checkbox-card:hover .custom-checkbox-card-mask,
  .custom-checkbox-card-checked .custom-checkbox-card-mask {
    border-color: rgb(var(--primary-6));
  }

  .custom-checkbox-card-checked {
    background-color: var(--color-primary-light-1);
  }

  .custom-checkbox-card:hover .custom-checkbox-card-title,
  .custom-checkbox-card-checked .custom-checkbox-card-title {
    color: rgb(var(--primary-6));
  }

  .custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
    background-color: rgb(var(--primary-6));
  }
  .a-input-user-name{
    width: 320px;
    margin-bottom: 8px;
  }
</style>
