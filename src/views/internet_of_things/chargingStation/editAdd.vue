<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        {{ formData?.id ? '编辑充电站' : '新增充电站' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="充电站名称"
                  field="stationName"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.stationName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="地址"
                  field="address"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.address"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="联系电话手机号"
                  field="phone"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.phone"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="慢充数"
                  field="slowChargeNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.slowChargeNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="快充数"
                  field="fastChargeNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.fastChargeNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="超级快充数"
                  field="superFastChargeNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.superFastChargeNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="已使用慢充数"
                  field="usedSlowChargeNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.usedSlowChargeNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="已使用快充数"
                  field="usedFastChargeNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.usedFastChargeNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="已使用超级快速数"
                  field="usedSuperFastChargeNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.usedSuperFastChargeNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="免费停车时长(单位：分钟)"
                  field="freeParkTime"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.freeParkTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="免费停车门槛时长(单位：分钟)"
                  field="freeParkThresholdTime"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.freeParkThresholdTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="经度"
                  field="positionX"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.positionX"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="纬度"
                  field="positionY"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.positionY"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="充电站类型" field="stationType" required>
                  <a-select
                    v-model="formData.stationType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in stationTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="停车场" field="carParkId">
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    @change="parkChange"
                    :filter-option="false"
                    v-model="formData.carParkId"
                  >
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                  <!-- <a-input-number v-model="formData.carParkId" allow-clear /> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="优惠账户" field="couponActivityId">
                  <a-select
                    v-model="formData.couponActivityId"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.couponActivityId"
                      v-for="item in couponActivityList"
                      :key="item.couponActivityId"
                      >{{ item.couponActivityName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="开始营业时间" field="startBusinessTime">
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.startBusinessTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="结束营业时间"
                  field="endBusinessTime"
                  validate-trigger="input"
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.endBusinessTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼层"
                  field="floors"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.floors"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否有洗手间" field="hasBathroom">
                  <a-select
                    v-model="formData.hasBathroom"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>

                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否有餐厅" field="hasDinningRoom">
                  <a-select
                    v-model="formData.hasDinningRoom"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>

                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否有休息室" field="hasLounge">
                  <a-select
                    v-model="formData.hasLounge"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>

                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否有商店" field="hasShop">
                  <a-select
                    v-model="formData.hasShop"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="室内或者室外" field="indoorOrOutdoor">
                  <a-select
                    v-model="formData.indoorOrOutdoor"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="1">室外</a-option>

                    <a-option :value="2">室内</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否对外开放" field="openToPublic">
                  <a-select
                    v-model="formData.openToPublic"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="服务费" field="serviceFee">
                  <a-input
                    v-model="formData.serviceFee"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="起步价" field="startPrice">
                  <a-input
                    v-model="formData.startPrice"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="状态" field="stationStatus">
                  <a-select
                    v-model="formData.stationStatus"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">停止营业</a-option>
                    <a-option :value="1">正常营业</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="图片" field="image">
                  <a-upload
                    list-type="picture-card"
                    :action="apiHost+'/file/cfFile/upload'"
                    :file-list="fileList"
                    :data="uploadData"
                    image-preview
                    :headers="header"
                    @success="onSuccess"
                    @change="onChange"
                  />
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
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import {
    cfChargingStationAdd,
    cfChargingStationUpdate,
    cfCarParkSearch,
  } from '@/api/internetOfThings';
  import {
    getCfCouponActivityLinkShopListByQuery
  } from '@/api/pay';
  import { parseTime } from '@/utils';
  import dayjs from 'dayjs';
  import { cloneDeep } from 'lodash';
  import { Message } from '@arco-design/web-vue';
  import { getToken } from '@/utils/auth';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    address: '',
    carParkId: '',
    countryId: '',
    endBusinessTime: '',
    fastChargeNumber: '',
    floors: '',
    freeParkTime: '',
    freeParkThresholdTime: 0,
    hasBathroom: '',
    hasDinningRoom: '',
    hasLounge: '',
    hasShop: '',
    image: '',
    indoorOrOutdoor: '',
    openToPublic: '',
    phone: '',
    positionX: '',
    positionY: '',
    provinceId: '',
    serviceFee: '',
    slowChargeNumber: '',
    startBusinessTime: '',
    startPrice: '',
    stateOrCityId: '',
    stationName: '',
    stationStatus: '',
    stationType: '',
    superFastChargeNumber: '',
    townshipId: '',
    usedFastChargeNumber: '',
    usedSlowChargeNumber: '',
    usedSuperFastChargeNumber: '',
    zoneOrCountyId: '',
    id: '',
    couponActivityId: '',
  });
  const parkList = ref([]);
  const selectLoading = ref(false);

  // 上传图片相关数据
  const fileList = ref([]);
  const uploadFileList = ref([]);
  const header: any = ref({
    Authorization: getToken(),
  });
  const uploadData: any = ref({
    fileType: 1,
    scene: 'carpark',
  });

  const stationTypeArr = [
    {
      value: 1,
      label: '电动车充电站',
    },
    {
      value: 2,
      label: '电动汽车充电站',
    },
  ];
  onMounted(() => {
    handleSelectSearch(null);
  });
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      newInfo.startBusinessTime = parseTime(e.startBusinessTime);
      newInfo.endBusinessTime = parseTime(e.endBusinessTime);
      newInfo.freeParkTime = e.freeParkTime / 60000
      newInfo.freeParkThresholdTime = e.freeParkThresholdTime / 60000
      formData.value = newInfo;
    }
    visible.value = true;
  };

  const couponActivityList = ref([])
  const parkChange = async (value: any) => {
  if (value) {
    selectLoading.value = true;
    const { data, code, total } = await getCfCouponActivityLinkShopListByQuery({
      params: {
        shopId: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      couponActivityList.value = data;
    } else {
      couponActivityList.value = [];
    }
  } else {
    couponActivityList.value = [];
  }
};

  // 上传相关方法
  const onChange = (_: any, currentFile: any) => {
    console.log(currentFile, _);
    uploadFileList.value = _;
  };
  const onSuccess = (fileRes: any) => {
    // @ts-ignore
    // uploadFileList.value = [...uploadFileList.value, fileRes.response.data.id];
  };

  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
  };
  const handleSelectSearch = async (value: any) => {
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
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      const newForm = cloneDeep(formData.value);
      // @ts-ignore
      newForm.startBusinessTime = dayjs(
        formData.value.startBusinessTime
      ).valueOf();
      if (uploadFileList.value.length > 0) {
        newForm.image = uploadFileList.value
          .map((i) => i.response.data.id)
          .join(',');
      }
      // @ts-ignore
      newForm.endBusinessTime = dayjs(formData.value.endBusinessTime).valueOf();
      // @ts-ignore
      newForm.freeParkTime = newForm.freeParkTime * 60000
      newForm.freeParkThresholdTime = newForm.freeParkThresholdTime * 60000

      // @ts-ignore
      if (formData.value.id) {
        const { code } = await cfChargingStationUpdate(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfChargingStationAdd(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('添加成功!');
          emit('fetchData');
        }
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
</style>
