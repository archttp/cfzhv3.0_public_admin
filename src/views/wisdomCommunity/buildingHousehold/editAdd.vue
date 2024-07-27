<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title>
        {{ formData?.id ? '编辑房户' : '新增房户' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="小区" field="villageId" required>
                  <a-select :loading="selectLoading" placeholder="请输入" allow-search allow-clear
                    @search="handleSelectSearch" @change="villageIdChange" :filter-option="false"
                    v-model="formData.villageId">
                    <a-option v-for="item of buildingHouseholdList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="楼栋" field="buildingId" validate-trigger="input" required>
                  <a-select :loading="selectLoading" placeholder="请选择" allow-search allow-clear :filter-option="false"
                    v-model="formData.buildingId" @change="buildingIdChange" :disabled="!buildingIdList.length">
                    <a-option v-for="item of buildingIdList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="收费规则" field="propertyFeeStandardId" validate-trigger="input" required>
                  <a-select :loading="selectLoading" placeholder="请选择" allow-search allow-clear :filter-option="false"
                    v-model="formData.propertyFeeStandardId" :disabled="!formData.buildingId">
                    <a-option v-for="item of roleList" :value="item.id">{{
                      item.ruleName
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="实际居住面积(单位：平方米)" field="actualArea" validate-trigger="input" required>
                  <a-input v-model="formData.actualArea" placeholder="请选择" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="楼层" field="floor" validate-trigger="input" required>
                  <a-input v-model="formData.floor" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="门牌号" field="houseNumber" validate-trigger="input" required>
                  <a-input v-model="formData.houseNumber" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="房屋名称缩写" field="houseShortName" validate-trigger="input" required>
                  <a-input v-model="formData.houseShortName" placeholder="请输入房屋名称缩写(例如：16-1-8-803 表示16栋1单元8层803号房间)"
                    allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="房屋状态" field="houseStatus" validate-trigger="input" required>
                  <a-select v-model="formData.houseStatus" placeholder="请选择" allow-clear>
                    <a-option :value="0">毛坯</a-option>
                    <a-option :value="1">正常居住</a-option>
                    <a-option :value="2">待售</a-option>
                    <a-option :value="3">出租居住中</a-option>
                    <a-option :value="4">待租中</a-option>
                    <a-option :value="5">冻结中</a-option>
                    <a-option :value="6">拍卖中</a-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="户主手机号" field="householderPhone" validate-trigger="input" required>
                  <a-input v-model="formData.householderPhone" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="抵押情况" field="mortgageStatus" validate-trigger="input" required>
                  <a-select v-model="formData.mortgageStatus" placeholder="请选择" allow-clear>
                    <a-option :value="0">无抵押</a-option>
                    <a-option :value="1">出让土地使用权</a-option>
                    <a-option :value="2">划拨土地使用权</a-option>
                    <a-option :value="3">集体土地使用权</a-option>
                    <a-option :value="4">预购商品房贷款抵押</a-option>
                    <a-option :value="5">在建工程抵押</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="居住人数" field="numberOfResidents" validate-trigger="input" required>
                  <a-input v-model="formData.numberOfResidents" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="购房情况" field="purchaseSituation" validate-trigger="input" required>
                  <a-select v-model="formData.purchaseSituation" placeholder="请选择" allow-clear>
                    <a-option :value="0">按揭首任房东</a-option>
                    <a-option :value="1">全款首任房东</a-option>
                    <a-option :value="2">按揭二手房东</a-option>
                    <a-option :value="3">全款二手房东</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="房产注册登记面积(单位：平方米)" field="registeredArea" validate-trigger="input" required>
                  <a-input v-model="formData.registeredArea" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="楼栋单元" field="unit" validate-trigger="input" required>
                  <a-input v-model="formData.unit" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="账单日(范围1-31)" field="statementDate" validate-trigger="input" required>
                  <a-input v-model="formData.statementDate" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="房屋名称(例如办公公司名称，机构名称等)" field="houseName" validate-trigger="input">
                  <a-input v-model="formData.houseName" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="室内图片" field="indoorPictures" validate-trigger="input">
                  <a-input v-model="formData.indoorPictures" placeholder="请输入" allow-clear></a-input>
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
import { addBuildingHousehold, updateBuildingHousehold, cfVillageSearch, getBuildingListByQuery, getPropertyFeeStandardListByQuery } from '@/api/wisdomCommunity';
import { Message } from '@arco-design/web-vue';

const visible = ref(false);
const loading = ref(false);
const selectLoading = ref(false);
const buildingHouseholdList = ref([]);
const buildingIdList = ref([]);

const roleList = ref([]);

const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const formData = ref({
  "actualArea": "",
  "buildingId": "",
  "floor": "",
  "houseName": "",
  "houseNumber": "",
  "houseShortName": "",
  "houseStatus": "",
  "householderPhone": "",
  "indoorPictures": "",
  "mortgageStatus": "",
  "numberOfResidents": "",
  "purchaseSituation": "",
  "registeredArea": "",
  "unit": "",
  "villageId": "",
  propertyFeeStandardId: '',
  statementDate: '',
  id: '',
});
const handleSelectSearch = async (value: any) => {
  if (value) {
    selectLoading.value = true;
    const { data, code } = await cfVillageSearch({
      params: {
        name: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      buildingHouseholdList.value = data;
    } else {
      buildingHouseholdList.value = [];
    }
  } else {
    buildingHouseholdList.value = [];
  }
};
const villageIdChange = async (value: any) => {
  if (value) {
    const { data, code } = await getBuildingListByQuery({
      params: {
        villageId: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      buildingIdList.value = data;
    } else {
      buildingIdList.value = [];
    }
  } else {
    buildingIdList.value = [];
  }

};
const buildingIdChange = (value: any) => {
  getRoleList(value)
};
const getRoleList = async (value: any) => {
  const { data, code } = await getPropertyFeeStandardListByQuery({
    params: {
      page: 1,
      size: 200,
      buildingId: value
    }
  })
  console.log("🚀🚀🚀🚀🚀🚀🚀 ~ file: editAdd.vue:235 ~ getRoleList ~ data:", data)
  if (code === 10002) {
    roleList.value = data
  } else {
    roleList.value = []
  }
};
const handleClick = (e: any = null) => {
  if (e?.id) {
    const newInfo = JSON.parse(JSON.stringify(e));
    formData.value = newInfo;
    villageIdChange(formData.value.villageId)
    getRoleList(formData.value.buildingId)
  }
  visible.value = true;
};
const resetFields = () => {
  formData.value.id = '';
  formRef.value.resetFields();
};
const onSubmitClick = () => {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (valid: any) => {
    if (valid) return false;
    // @ts-ignore
    if (formData.value.id) {
      const { code } = await updateBuildingHousehold(formData.value);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('更新成功!');
        emit('fetchData');
      }
    } else {
      const { code } = await addBuildingHousehold(formData.value);
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
