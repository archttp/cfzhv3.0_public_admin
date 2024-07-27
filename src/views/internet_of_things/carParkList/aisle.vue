<template>
  <div class="container">
    <a-modal v-model:visible="visible" fullscreen :footer="false" @close="modalClose">
      <template #title> {{ modalTitle }} - 通道 </template>
      <a-button type="primary" @click="handleAddAisle" style="margin-bottom: 16px">
        <template #icon>
          <icon-plus />
        </template>
        添加通道
      </a-button>
      <!-- <a-row :gutter="24" justify="start">
        <a-col :span="8" v-for="item in list" :key="item.id"> -->
      <div style="display: flex; flex-wrap: wrap; width: 96vw; margin-top: 16px">
        <a-card :style="{ width: '360px', marginBottom: '10px', marginRight: '16px' }" :title="item.name" hoverable
          v-for="item in list" :key="item.id">
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
          <view @click="copyText(item.id)"> id: {{ item.id }} </view>
          <br />
          经度: {{ item.positionX }}<br />
          纬度: {{ item.positionY }}<br />
          状态: {{ checkPointStatus[item.status] }}<br />
          模式: {{ item.dutyMode ? '人工值守' : '无人值守' }}<br />
        </a-card>
      </div>

      <!-- </a-col>
      </a-row> -->
    </a-modal>
    <a-modal :title="aisleTitle" v-model:visible="visible2" :footer="false" :width="1200">
      <a-button type="primary" @click="handleDeviceAdd" style="margin-bottom: 16px">
        <template #icon>
          <icon-plus />
        </template>
        新增
      </a-button>

      <a-tabs trigger="click" @change="tabChange">
        <a-tab-pane :title="item.label" v-for="item in deviceTypeList" :key="item.value">
        </a-tab-pane>
      </a-tabs>
      <a-table row-key="id" :columns="columns" :data="devicesList" :pagination="pagination" :loading="tableLoading">
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
            <a-popconfirm content="您确定删除吗？" @ok="onDeviceDelete(record.id)">
              <a-button type="primary" status="danger" size="mini">删除</a-button>
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handleDeviceEdit(record)">编辑</a-button>
            <a-button type="primary" size="mini" @click="handSwitchOpen(record, 'on')">开闸</a-button>
            <a-button type="primary" size="mini" @click="handSwitchOpen(record, 'off')">关闸</a-button>
            <a-button type="primary" size="mini" @click="createExitCode(record)">创建二维码</a-button>
            <a-button v-if="record.deviceType==2" type="primary" size="mini" @click="createExitvolume(record)">设置音量</a-button>
          </a-space>
        </template>
      </a-table>
    </a-modal>
    <a-modal v-model:visible="visible3" :footer="false" :width="800" @close="deviceFormClose">
      <a-form ref="deviceFormRef" layout="vertical" :model="deviceFormData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="场地id" field="areaId" validate-trigger="input" required disabled>
                  <a-input v-model="deviceFormData.areaId" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="关卡点位id" field="checkPointId" validate-trigger="input" required disabled>
                  <a-input v-model="deviceFormData.checkPointId" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备名称" field="deviceName" validate-trigger="input" required>
                  <a-input v-model="deviceFormData.deviceName" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备类型" field="deviceType" validate-trigger="input" required>
                  <a-select v-model="deviceFormData.deviceType" placeholder="请选择" allow-clear disabled>
                    <a-option :value="item.value" v-for="item in deviceTypeList" :key="item.value">{{ item.label
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备序列号" field="serialNo" validate-trigger="input" required>
                  <a-input v-model="deviceFormData.serialNo" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="输出终端类型" field="outputTerminalType" required>
                  <a-select v-model="deviceFormData.outputTerminalType" placeholder="请选择" allow-clear>
                    <a-option :value="0">无输出</a-option>
                    <a-option :value="1">LED</a-option>
                    <a-option :value="2">LCD</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="品牌" field="brand">
                  <a-select v-model="deviceFormData.brand" placeholder="请选择" allow-clear>
                    <a-option :value="item.value" v-for="item in brandOptions" :key="item.value">{{ item.label
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备编号" field="deviceNo">
                  <a-input v-model="deviceFormData.deviceNo" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="排序" field="indexNo">
                  <a-input v-model="deviceFormData.indexNo" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="ip" field="ip">
                  <a-input v-model="deviceFormData.ip" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备mac地址" field="macAddress">
                  <a-input v-model="deviceFormData.macAddress" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="型号" field="model">
                  <a-input v-model="deviceFormData.model" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="连接模式" field="networkProtocol">
                  <a-select v-model="deviceFormData.networkProtocol" placeholder="请选择" allow-clear>
                    <a-option :value="item.value" v-for="item in networkProtocolOptions" :key="item.value">{{ item.label
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否已经通知了设备掉线" field="noticed">
                  <a-select v-model="deviceFormData.noticed" placeholder="请选择" allow-clear>
                    <a-option :value="item.value" v-for="item in options1" :key="item.value">{{ item.label }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="设备功率" field="power">
                  <a-input v-model="deviceFormData.power" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="产品id" field="productId">
                  <a-input v-model="deviceFormData.productId" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="行数" field="showRows">
                  <a-input v-model="deviceFormData.showRows" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态" field="status">
                  <a-select v-model="deviceFormData.status" placeholder="请选择" allow-clear>
                    <a-option :value="item.value" v-for="item in statusOptions" :key="item.value">{{ item.label
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备视频流地址" field="videoAddress">
                  <a-input v-model="deviceFormData.videoAddress" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备登录用户" field="username">
                  <a-input v-model="deviceFormData.username" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备登录密码" field="password">
                  <a-input v-model="deviceFormData.password" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="设备key" field="deviceKey">
                  <a-input v-model="deviceFormData.deviceKey" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>

              <!-- <a-col :span="8">
                <a-form-item label="验证模式" field="authenticationMode">
                  <a-input
                    v-model="deviceFormData.authenticationMode"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item label="硬件SDK下载地址" field="sdkDownloadAddress">
                  <a-input v-model="deviceFormData.sdkDownloadAddress" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="SDK版本" field="sdkVersion">
                  <a-input v-model="deviceFormData.sdkVersion" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="SDK软件包HASH或MD5值" field="sdkHashMd5">
                  <a-input v-model="deviceFormData.sdkHashMd5" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="文件平台" field="filePlatform">
                  <a-select v-model="deviceFormData.filePlatform" placeholder="请选择" allow-clear>
                    <a-option :value="item.value" v-for="item in fileTypeList" :key="item.value">{{ item.label
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="文件平台id" field="filePlatformId">
                  <a-select v-model="deviceFormData.filePlatformId" placeholder="请选择" allow-clear>
                    <a-option :value="item.id" v-for="item in filePlatformList" :key="item.id">{{ item.configName
                    }}</a-option>
                  </a-select>
                  <!-- <a-input
                    v-model="deviceFormData.filePlatformId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input> -->
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item field="carParkId" label="关联停车场">
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="deviceFormData.associationAreaId"
                    @change="parkChange"
                  >
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="关联通道" field="associationCheckPointId">
                  <a-select
                    v-model="deviceFormData.associationCheckPointId"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.id"
                      v-for="item in checkPointList"
                      :key="item.id"
                      >{{ item.name }}</a-option
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
    <a-modal v-model:visible="visible4" :footer="false" :width="800" @close="createExitCodeFormClose">
      <div v-if="createCodeImage">
        <img :src="createCodeImage" style="width: 300px; height: 300px; margin-bottom: 16px" />
      </div>

      <a-radio-group type="button" @change="radioGroupChange" v-model="radioGroupValue"
        :options="radioGroupOptions"></a-radio-group>
      <a-form ref="createExitCodeFormRef" layout="vertical" :model="createExitCodeFormData" style="margin-top: 16px">
        <a-form-item label="地址" field="text" validate-trigger="input" required>
          <a-input v-model="createExitCodeFormData.text" placeholder="请输入" allow-clear></a-input>
        </a-form-item>
        <div class="actions">
          <a-space>
            <!-- <a-button @click="resetFields"> 重置 </a-button> -->
            <a-button :loading="createCodeloading" type="primary" @click="onStartCreateCode">
              点击创建
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="visible5" :footer="false" :width="900" @close="createExitVolumeFormClose">
      <template #title> {{deviceName}} - 设备音量设置 </template>
      <a-slider :default-value="50" :style="{ width: '800px' }" :step="5" @change="volumeChange" :max="100" :marks="marks" />
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
import {
  controllerDeviceSwitch,
  createTempQrCode,
  getCheckPointQrcodeDomain,
  cfCarParkSearch,
  controllerDeviceVoice
} from '@/api/internetOfThings';
import { getFilePlatformListByQuery } from "@/api/files";
import { Message } from '@arco-design/web-vue';
import aisleEdit from './aisleEdit.vue';
import { copyText } from '@/utils/copyText';
import dayjs from 'dayjs';
import { urlToBase64 } from '@/utils';
import qrcodeIconImg from '@/assets/images/qrcode-icon.png';
const _loginQcodeText = import.meta.env.VITE_LOGIN_QRCODE_TEXT;

const parkingId = ref('');
const deviceId = ref(0);
const deviceName = ref('');
const visible = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const changeValueTime = ref(0);
const marks = {
      0: '0',
      5: '5',
      10: '10',
      15: '15',
      20: '20',
      25: '25',
      30: '30',
      35: '35',
      40: '40',
      45: '45',
      50: '50',
      55: '55',
      60: '60',
      65: '65',
      70: '70',
      75: '75',
      80: '80',
      85: '85',
      90: '90',
      95: '95',
      100: '100'
    };
const modalTitle = ref('');
const aisleTitle = ref('');
const deviceFormRef = ref();
const aisleEditRef = ref();
const list = ref([]);
const devicesList = ref([]);
const devicesType = ref(2);
const tableLoading = ref(false);
const createCodeloading = ref(false);
const createCodeImage = ref('');
const createCodeInfo = ref({
  id: '',
  checkPointId: '',
});
const radioGroupValue = ref('入场');
const radioGroupOptions = ['入场', '出场', '降锁'];
const checkPointStatus = ['正常', '关闭通行', '仅采集数据'];
const deviceFormModel = () => {
  return {
    areaId: localStorage.getItem('parkingId'),
    brand: '',
    checkPointId: localStorage.getItem('aisleId'),
    deviceName: '',
    deviceNo: '',
    deviceType: '',
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
    outputTerminalType: '',
    authenticationMode: '',
    sdkDownloadAddress: '',
    sdkVersion: '',
    sdkHashMd5: '',
    filePlatform: '',
    filePlatformId: 0,
    id: '',
    deviceKey: '',
    associationCheckPointId: 0,
    associationAreaId: 0,
  };
};
const deviceFormData: any = ref(deviceFormModel());
const createExitCodeFormData = ref({
  height: '300',
  logoText: '',
  text: '',
  width: '300',
  logoText: _loginQcodeText,
  logoIconBase64: ''
});
const filePlatformList = ref([]);
const urlHead = ref('');
const fileTypeList = [
  { label: 'minio', value: 'minio' },
  { label: '阿里云oss', value: 'aliyun_oss' },
  { label: '开源Fastdfs', value: 'fastdfs' },
  { label: '七牛云存储', value: 'qiniu' },
];

const deviceTypeList = [
  { label: '常规车牌识别相机', value: 2 },
  { label: '匝道', value: 1 },
  { label: '高位相机', value: 3 },
  { label: '地锁', value: 4 },
  { label: 'led设备', value: 5 },
  { label: '监控相机', value: 6 },
  { label: '人脸识别机', value: 7 },
  { label: '充电桩', value: 8 },
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
  {
    label: '信路通',
    value: 'xlut',
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
    dataIndex: 'newBrand',
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

const selectLoading = ref(false);
const parkList = ref([]);
const handleSelectSearch = async (value: any) => {
  if (value) {
    selectLoading.value = true;
    const { data, code } = await cfCarParkSearch({
      params: {
        name: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      parkList.value = data;
    } else {
      parkList.value = [];
    }
  } else {
    parkList.value = [];
  }
};

const checkPointList = ref([])
const currentCheckPoint = ref()
const parkChange = async (value: any) => {
  if (value) {
    selectLoading.value = true;
    const { data, code } = await cfCheckPointGet({
      params: {
        areaId: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      checkPointList.value = data;
    } else {
      checkPointList.value = [];
    }
  } else {
    checkPointList.value = [];
  }
};

const radioGroupChange = (e: any) => {
  if (e === '入场') {
    createExitCodeFormData.value.text =
      `${urlHead.value}/scene/licensePlateRecognition/deviceId/` +
      createCodeInfo.value.id;
  } else if (e === '出场') {
    createExitCodeFormData.value.text =
      `${urlHead.value}/scene/carParkFee/checkPointId/` +
      createCodeInfo.value.checkPointId;
  } else if (e === '降锁') {
    createExitCodeFormData.value.text =
      `${urlHead.value}/scene/parkingLock/deviceId/` +
      createCodeInfo.value.id;
  }
};
const createExitCodeFormClose = () => {
  radioGroupValue.value = '入场';
  createExitCodeFormData.value.text = '';
  createCodeImage.value = '';
};
const createExitVolumeFormClose = () => {
  
};
const createExitCode = async (row: any) => {
  if(currentCheckPoint.value.features=='in'){
    radioGroupValue.value = '入场';
  }else{
    radioGroupValue.value = '出场';
  }
  createExitCodeFormData.value.logoText = currentCheckPoint.value.name; //通道名称作为二维码底部文字
  devicesType.value = row.deviceType
  createCodeInfo.value = row;
  const { data, code, message } = await getCheckPointQrcodeDomain({
    params: {
      areaId: localStorage.getItem('parkingId'),
      scene: 1,
      page: 1,
      size: 200
    }
  })
  if (code === 10002) {
    urlHead.value = data
    radioGroupChange(radioGroupValue.value);
    visible4.value = true;
  } else {
    Message.error(message);
  }

};
const createExitvolume = async (row: any) => {
  visible5.value = true;
  deviceId.value = row.id;
  deviceName.value = row.deviceName;
};
const onStartCreateCode = async () => {
  createCodeloading.value = true;
  createCodeImage.value = '';
  let base64 = urlToBase64(qrcodeIconImg);
  base64.then(async (resolve)=>{
    createExitCodeFormData.value.logoIconBase64 = resolve.substr(resolve.indexOf(',')+1)
    const { data, code } = await createTempQrCode(createExitCodeFormData.value);
    if (code == 10002) {
      createCodeImage.value = 'data:image/png;base64,' + data;
    }
    createCodeloading.value = false;
  })
  
};
const volumeChange = async (changeValue: any) => {
  let currentTime = dayjs().valueOf();
  if(currentTime-changeValueTime.value<1000){
    return;
  }
  changeValueTime.value = currentTime;
  const { data, code } = await controllerDeviceVoice({
    deviceId: deviceId.value,
    volume: changeValue
  });
};
const handSwitchOpen = async (row: any, type: any) => {
  console.log(row, type);
  if (row.deviceType === 2 || row.deviceType === 4) {
    const { code, message } = await controllerDeviceSwitch({
      action: type,
      deviceId: row.id,
    });
    if (code == 10002) {
      Message.success(message);
    }
  } else {
    Message.error('暂只支持常规车牌识别相机 跟 地锁');
  }
};
const modalClose = () => {
  list.value = [];
};
const handleClick = (id: string, title: string) => {
  visible.value = true;
  parkingId.value = id;
  modalTitle.value = title;
  fetchData();
};

const tabChange = (e: any) => {
  devicesType.value = e;
  getDeviceList();
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
const getFilePlatformList = async () => {
  const { code, message, data } = await getFilePlatformListByQuery({
    params: {
      page: 1,
      size: 200
    },
  });
  console.log("🚀🚀🚀🚀🚀🚀🚀 ~ file: aisle.vue:877 ~ getFilePlatformList ~ data:", data)
  if (code === 10002) {
    filePlatformList.value = data
  } else {
    filePlatformList.value = []
    Message.error(message);
  }
};
// 硬件相关事件
const handleDeviceAdd = () => {
  deviceFormData.value.areaId = localStorage.getItem('parkingId');
  deviceFormData.value.checkPointId = localStorage.getItem('aisleId');
  deviceFormData.value.deviceType = devicesType.value;
  getFilePlatformList()
  visible3.value = true;
};
const getLabelByValue = (value: any) => {
  const option = brandOptions.find((item: any) => item.value === value);
  return option ? option.label : '';
};
const getDeviceList = async () => {
  tableLoading.value = true;
  const { data, code } = await cfDeviceGet({
    params: {
      checkPointId: localStorage.getItem('aisleId'),
      page: 1,
      size: 200,
      deviceType: devicesType.value,
    },
  });
  tableLoading.value = false;
  if (code === 10002) {
    for (const i of data) {
      i.newBrand = getLabelByValue(i.brand);
    }
    devicesList.value = data;
  } else {
    devicesList.value = [];
  }
};
const onDevice = async (item: any) => {
  localStorage.setItem('aisleId', item.id);
  aisleTitle.value = item.name;
  visible2.value = true;
  currentCheckPoint.value = item;
  getDeviceList();
};
const handleDeviceEdit = (row: any) => {
  deviceFormData.value.areaId = localStorage.getItem('parkingId');
  deviceFormData.value.checkPointId = localStorage.getItem('aisleId');
  if (row?.id) {
    deviceFormData.value = JSON.parse(JSON.stringify(row));
  }
  if(row.associationCheckPointId){
    parkList.value[0] = {id: row.associationAreaId, name: row.associationAreaName};
    checkPointList.value[0] = {id: row.associationCheckPointId, name: row.associationCheckPointName};
  }
  getFilePlatformList()
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
    if(!deviceFormData.value.associationAreaId){
      deviceFormData.value.associationAreaId = 0;
    }
    if(!deviceFormData.value.associationCheckPointId){
      deviceFormData.value.associationCheckPointId = 0;
    }
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
