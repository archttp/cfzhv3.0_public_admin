<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      fullscreen
      :footer="false"
      @close="modalClose"
    >
      <template #title> {{ modalTitle }} - 通道 </template>
      <a-button
        type="primary"
        @click="handleAddAisle"
        style="margin-bottom: 16px"
      >
        <template #icon>
          <icon-plus />
        </template>
        添加通道
      </a-button>
      <!-- <a-row :gutter="24" justify="start">
        <a-col :span="8" v-for="item in list" :key="item.id"> -->
      <div
        style="display: flex; flex-wrap: wrap; width: 96vw; margin-top: 16px"
      >
        <a-card
          :style="{ width: '360px', marginBottom: '10px', marginRight: '16px' }"
          :title="item.name"
          hoverable
          v-for="item in list"
          :key="item.id"
        >
          <template #extra>
            <a-dropdown trigger="click">
              <a-link>操作</a-link>
              <template #content>
                <a-doption>
                  <a-space @click="onDevice(item)">
                    <icon-tag />
                    <span> 硬件 </span>
                  </a-space>
                </a-doption>
                <a-doption>
                  <a-space @click="handleAEditAisle(item)">
                    <icon-edit />
                    <span> 编辑 </span>
                  </a-space>
                </a-doption>
                <a-doption>
                  <a-space @click="handleADeleteAisle(item)">
                    <icon-delete />
                    <span> 删除 </span>
                  </a-space>
                </a-doption>
              </template>
            </a-dropdown>
          </template>
          经度: {{ item.positionX }}<br />
          纬度: {{ item.positionY }}<br />
          状态: {{ checkPointStatus[item.status] }}<br />
          模式: {{ item.dutyMode ? '人工值守' : '无人值守' }}<br />
        </a-card>
      </div>

      <!-- </a-col>
      </a-row> -->
    </a-modal>
    <a-modal
      :title="aisleTitle"
      v-model:visible="visible2"
      :footer="false"
      :width="800"
    >
      <a-button
        type="primary"
        @click="handleDeviceAdd"
        style="margin-bottom: 16px"
      >
        <template #icon>
          <icon-plus />
        </template>
        新增
      </a-button>
      <a-table
        row-key="id"
        :columns="columns"
        :data="devicesList"
        :pagination="pagination"
      >
        <template #id="{ record }">
          <div @click="copyText(record.id)">
            {{ record.id }}
          </div>
        </template>
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-space>
            <a-popconfirm
              content="您确定删除吗？"
              @ok="onDeviceDelete(record.id)"
            >
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
            <a-button
              type="primary"
              size="mini"
              @click="handleDeviceEdit(record)"
              >编辑</a-button
            >
          </a-space>
        </template>
      </a-table>
    </a-modal>
    <a-modal
      v-model:visible="visible3"
      :footer="false"
      :width="800"
      @close="deviceFormClose"
    >
      <a-form ref="deviceFormRef" layout="vertical" :model="deviceFormData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="场地id"
                  field="areaId"
                  validate-trigger="input"
                  required
                  disabled
                >
                  <a-input
                    v-model="deviceFormData.areaId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="关卡点位id"
                  field="checkPointId"
                  validate-trigger="input"
                  required
                  disabled
                >
                  <a-input
                    v-model="deviceFormData.checkPointId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="设备名称"
                  field="deviceName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="deviceFormData.deviceName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="设备类型"
                  field="deviceType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="deviceFormData.deviceType"
                    placeholder="请选择"
                    allow-clear
                    disabled
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in deviceType"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="设备序列号"
                  field="serialNo"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="deviceFormData.serialNo"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="品牌" field="brand">
                  <a-select
                    v-model="deviceFormData.brand"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in brandOptions"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备编号" field="deviceNo">
                  <a-input
                    v-model="deviceFormData.deviceNo"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="排序" field="indexNo">
                  <a-input
                    v-model="deviceFormData.indexNo"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="ip" field="ip">
                  <a-input
                    v-model="deviceFormData.ip"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备mac地址" field="macAddress">
                  <a-input
                    v-model="deviceFormData.macAddress"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="型号" field="model">
                  <a-input
                    v-model="deviceFormData.model"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="连接模式" field="networkProtocol">
                  <a-select
                    v-model="deviceFormData.networkProtocol"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in networkProtocolOptions"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否已经通知了设备掉线" field="noticed">
                  <a-select
                    v-model="deviceFormData.noticed"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in options1"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="设备功率" field="power">
                  <a-input
                    v-model="deviceFormData.power"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="产品id" field="productId">
                  <a-input
                    v-model="deviceFormData.productId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="行数" field="showRows">
                  <a-input
                    v-model="deviceFormData.showRows"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态" field="status">
                  <a-select
                    v-model="deviceFormData.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in statusOptions"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备视频流地址" field="videoAddress">
                  <a-input
                    v-model="deviceFormData.videoAddress"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备登录用户" field="username">
                  <a-input
                    v-model="deviceFormData.username"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备登录密码" field="password">
                  <a-input
                    v-model="deviceFormData.password"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="输出终端类型" field="outputTerminalType">
                  <a-select
                    v-model="deviceFormData.outputTerminalType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">无输出</a-option>
                    <a-option :value="1">LED</a-option>
                    <a-option :value="2">LCD</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="验证模式" field="authenticationMode">
                  <a-select
                    v-model="deviceFormData.authenticationMode"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">人脸</a-option>
                    <a-option :value="1">IC卡</a-option>
                    <a-option :value="2">IC卡，身份证或人脸</a-option>
                    <a-option :value="3">人脸+卡识别，双重认证</a-option>
                    <a-option :value="4">身份证+人脸，双重认证(人证)</a-option>
                    <a-option :value="5">身份证+人脸+白名单，三重认证</a-option>
                    <a-option :value="6">人脸或人证模式</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="硬件SDK下载地址" field="sdkDownloadAddress">
                  <a-input
                    v-model="deviceFormData.sdkDownloadAddress"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="SDK版本" field="sdkVersion">
                  <a-input
                    v-model="deviceFormData.sdkVersion"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="SDK软件包HASH或MD5值" field="sdkHashMd5">
                  <a-input
                    v-model="deviceFormData.sdkHashMd5"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="文件平台" field="filePlatform">
                  <a-select
                    v-model="deviceFormData.filePlatform"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in fileTypeList"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-space>
        <div class="actions">
          <a-space>
            <!-- <a-button @click="resetFields"> 重置 </a-button> -->
            <a-button type="primary" @click="onSubmitClick"> 保存 </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
    <aisleEdit ref="aisleEditRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import {
    cfCheckPointGet,
    cfDeviceGet,
    cfDeviceAdd,
    cfDeviceUpdate,
    cfDeviceDelete,
    cfCheckPointDelete,
  } from '@/api/park';
  import { Message } from '@arco-design/web-vue';
  import aisleEdit from './aisleEdit.vue';
  import { copyText } from '@/utils/copyText';
  
  const parkingId = ref('');
  const visible = ref(false);
  const visible2 = ref(false);
  const visible3 = ref(false);
  const modalTitle = ref('');
  const aisleTitle = ref('');
  const deviceFormRef = ref();
  const aisleEditRef = ref();
  const list = ref([]);
  const devicesList = ref([]);
  const checkPointStatus = ['正常', '关闭通行', '仅采集数据'];
  const deviceFormModel = () => {
    return {
      areaId: localStorage.getItem('parkingId'),
      brand: '',
      checkPointId: localStorage.getItem('aisleId'),
      deviceName: '',
      deviceNo: '',
      deviceType: 7,
      indexNo: '',
      ip: '',
      macAddress: '',
      model: '',
      networkProtocol: '',
      noticed: '',
      password: '',
      power: 0,
      productId: 0,
      serialNo: '',
      showRows: '',
      status: '',
      username: '',
      videoAddress: '',
      filePlatform: '',
      id: '',
    };
  };
  const deviceFormData: any = ref(deviceFormModel());

  const fileTypeList = [
    { label: 'minio', value: 'minio' },
    { label: '阿里云oss', value: 'aliyun_oss' },
    { label: '开源Fastdfs', value: 'fastdfs' },
    { label: '七牛云存储', value: 'qiniu' },
  ];
  const brandOptions = [
    {
      label: '臻识',
      value: 'zhen_shi',
    },
    {
      label: '华夏',
      value: 'hua_xia',
    },
    {
      label: '千熠',
      value: 'qian_yi',
    },
    {
      label: '海康',
      value: 'hk',
    },
    {
      label: '大华',
      value: 'dh',
    },
    {
      label: '道通物联',
      value: 'olm',
    },
    {
      label: '方控',
      value: 'fang_kong',
    },
    {
      label: '驴充充',
      value: 'lv_chong_chong',
    },
    {
      label: '金盾',
      value: 'king_tun',
    },
    {
      label: '答案',
      value: 'da_an',
    },
    {
      label: '云快充',
      value: 'yun_kuai_chong',
    },
    {
      label: '才风智慧',
      value: 'cfzh',
    },
  ];
  const options1 = [
    {
      label: '否',
      value: 0,
    },
    {
      label: '是',
      value: 1,
    },
  ];
  const networkProtocolOptions = [
    {
      label: 'tcp',
      value: 'tcp',
    },
    {
      label: 'mqtt',
      value: 'mqtt',
    },
    {
      label: 'http',
      value: 'http',
    },
    {
      label: 'websocket',
      value: 'websocket',
    },
  ];
  const statusOptions = [
    {
      label: '已下线',
      value: 0,
    },
    {
      label: '正常',
      value: 1,
    },
    {
      label: '故障维护',
      value: 2,
    },
    {
      label: '占用',
      value: 3,
    },
  ];
  const deviceType = [
    {
      label: '匝道',
      value: 1,
    },
    {
      label: '常规车牌识别相机',
      value: 2,
    },
    {
      label: '高位相机',
      value: 3,
    },
    {
      label: '地锁',
      value: 4,
    },
    {
      label: 'led设备',
      value: 5,
    },
    {
      label: '监控相机',
      value: 6,
    },
    {
      label: '人脸识别机',
      value: 7,
    },
    {
      label: '充电桩',
      value: 8,
    },
  ];

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      slotName: 'id',
      width: 200,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '协议',
      dataIndex: 'networkProtocol',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];

  const modalClose = () => {
    list.value = [];
  };
  const handleClick = (id: string, title: string) => {
    visible.value = true;
    parkingId.value = id;
    modalTitle.value = title;
    fetchData();
  };

  // 通道相关
  const handleAddAisle = () => {
    aisleEditRef.value.handleClick();
  };
  const handleAEditAisle = (row: any) => {
    aisleEditRef.value.handleClick(row);
  };
  const handleADeleteAisle = async (row: any) => {
    const { code, message } = await cfCheckPointDelete({
      params: {
        id: row.id,
      },
    });
    if (code === 10002) {
      Message.success('删除成功!');
      fetchData();
    } else {
      Message.error(message);
    }
  };
  // 硬件相关事件
  const handleDeviceAdd = () => {
    deviceFormData.value.areaId = localStorage.getItem('parkingId');
    deviceFormData.value.checkPointId = localStorage.getItem('aisleId');
    visible3.value = true;
  };
  const getDeviceList = async () => {
    const { data, code } = await cfDeviceGet({
      params: {
        checkPointId: localStorage.getItem('aisleId'),
        page: 1,
        size: 200,
        deviceType: 7,
      },
    });
    console.log(data, code);
    if (code === 10002) {
      devicesList.value = data;
    } else {
      devicesList.value = [];
    }
  };
  const onDevice = async (item: any) => {
    localStorage.setItem('aisleId', item.id);
    aisleTitle.value = item.name;
    visible2.value = true;
    getDeviceList();
  };
  const handleDeviceEdit = (row: any) => {
    // deviceFormData.value.areaId = localStorage.getItem('aisleId');
    deviceFormData.value.checkPointId = localStorage.getItem('aisleId');
    console.log(row);
    if (row?.id) {
      deviceFormData.value = JSON.parse(JSON.stringify(row));
    }
    visible3.value = true;
  };
  const deviceFormClose = () => {
    deviceFormRef.value.resetFields();
    deviceFormData.value = deviceFormModel();
  };
  const onDeviceDelete = async (id: any) => {
    await cfDeviceDelete({ params: { id: id } });
    getDeviceList();
  };
  const onSubmitClick = async () => {
    deviceFormRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (deviceFormData.value.id) {
        const { code } = await cfDeviceUpdate(deviceFormData.value);
        if (code === 10002) {
          deviceFormRef.value.resetFields();
          visible3.value = false;
          getDeviceList();
          Message.success('更新成功!');
        }
      } else {
        const { code } = await cfDeviceAdd(deviceFormData.value);
        if (code === 10002) {
          deviceFormRef.value.resetFields();
          visible3.value = false;
          getDeviceList();
          Message.success('添加成功!');
        }
      }
    });
  };
  //硬件相关事件 End

  const fetchData = async () => {
    const { data, code } = await cfCheckPointGet({
      params: {
        areaId: parkingId.value,
        page: 1,
        size: 200,
      },
    });
    console.log(data, code);
    if (code == 10002) {
      list.value = data;
    } else {
      list.value = [];
      // visible.value = false;
    }
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
