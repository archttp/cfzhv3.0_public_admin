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
        {{ formData?.id ? '编辑小区' : '新增小区' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="小区名称"
                  field="name"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.name"
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
                  label="占地面积(单位：平方米)"
                  field="areaCovered"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.areaCovered"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="房价均价"
                  field="averageHousePrice"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.averageHousePrice"
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
              <!-- <a-col :span="8">
                <a-form-item
                  label="国家id"
                  field="countryId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.countryId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col> -->

              <!-- <a-col :span="8">
                <a-form-item
                  label="省份id"
                  field="provinceId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.provinceId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="州或城市id"
                  field="stateOrCityId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.stateOrCityId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="区或县id"
                  field="zoneOrCountyId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.zoneOrCountyId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  label="省市区"
                  field="provinceId"
                  validate-trigger="input"
                  required
                >
                  <a-cascader
                    path-mode
                    :options="rawCitiesData"
                    @change="rawCitiesDataChange"
                    placeholder="请选择"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="居住人口"
                  field="residentPopulation"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.residentPopulation"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="住宅等级"
                  field="residentialGrade"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.residentialGrade"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="住宅类型"
                  field="residentialGrade"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.residentialType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in houseTypes"
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
                <a-form-item
                  label="联系人"
                  field="contacts"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.contacts"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="座机"
                  field="landline"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.landline"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="手机号"
                  field="phone"
                  validate-trigger="input"
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
                  label="物业公司名称"
                  field="propertyCompany"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.propertyCompany"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="物业公司编号"
                  field="propertyCompanyNo"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.propertyCompanyNo"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="乡镇id"
                  field="townshipId"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.townshipId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
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
  import { ref } from 'vue';
  import {
    wisdomCommunityAdd,
    wisdomCommunityUpdate,
  } from '@/api/wisdomCommunity';
  import { Message } from '@arco-design/web-vue';
  // @ts-ignore
  import rawCitiesData from '@/utils/city-data';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    address: '',
    areaCovered: '',
    averageHousePrice: '',
    contacts: '',
    countryId: 0,
    images: '',
    landline: '',
    name: '',
    openingTimeOfRealEstate: '',
    phone: '',
    positionX: '',
    positionY: '',
    propertyCompany: '',
    propertyCompanyNo: '',
    provinceId: '',
    residentPopulation: '',
    residentialGrade: '',
    residentialType: '',
    stateOrCityId: '',
    townshipId: '',
    zoneOrCountyId: '',
    id: '',
  });
  const houseTypes = [
    { value: 1, label: '商品房' },
    { value: 2, label: '房改房' },
    { value: 3, label: '存量房' },
    { value: 4, label: '集资房' },
    { value: 5, label: '平价房' },
    { value: 6, label: '解困房' },
    { value: 7, label: '再上市房' },
    { value: 8, label: '廉租住房' },
    { value: 9, label: '花园式住宅' },
    { value: 10, label: '公寓式住宅' },
    { value: 11, label: '经济适用住房' },
    { value: 12, label: '限价房' },
    { value: 13, label: '商业综合体' },
    { value: 14, label: '商业街' },
    { value: 15, label: '写字楼办公区' },
    { value: 16, label: '工业园区' },
    { value: 17, label: '社会组织机构区' },
    { value: 18, label: '政府组织机构区' },
    { value: 19, label: '武警部队区' },
    { value: 20, label: '学校组织区域' },
  ];
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      formData.value = newInfo;
    }
    visible.value = true;
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
  };
  const rawCitiesDataChange = (e: any) => {
    console.log(e);
    formData.value.provinceId = e[0];
    formData.value.stateOrCityId = e[1];
    formData.value.zoneOrCountyId = e[2];
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await wisdomCommunityUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await wisdomCommunityAdd(formData.value);
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
