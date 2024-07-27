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
        {{ formData?.id ? '编辑车牌绑定' : '新增车牌绑定' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="车牌号"
                  field="numberPlate"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.numberPlate"
                    placeholder="请输入车牌号"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="汽车主人id"
                  field="uid"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.uid"
                    placeholder="请输入汽车主人id"
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
                <a-form-item
                  label="品牌"
                  field="brand"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.brand"
                    placeholder="请输入品牌"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="名称"
                  field="carName"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.carName"
                    placeholder="请输入名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="车型"
                  field="carType"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.carType"
                    placeholder="请输入车型"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="厂家名称"
                  field="manufacturer"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.manufacturer"
                    placeholder="请输入厂家名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="购买价格"
                  field="price"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.price"
                    placeholder="请输入购买价格"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  label="购买时间"
                  field="purchaseTime"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.purchaseTime"
                    placeholder="请输入购买时间"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  label="购买时间"
                  field="purchaseTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.purchaseTime"
                  />
                </a-form-item>
              </a-col>


              <a-col :span="8">
                <a-form-item
                  label="状态"
                  field="status"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">审核中</a-option>
                    <a-option :value="1">正常</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="车架号"
                  field="vin"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.vin"
                    placeholder="请输入车架号"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="年款"
                  field="yearType"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.yearType"
                    placeholder="请输入年款"
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
  import { bindAdds, bindUpdate } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import { parseTime } from '@/utils'
  import { cloneDeep } from 'lodash';
  import dayjs from 'dayjs';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    brand: '',
    carName: '',
    carType: '',
    certificationImage: '',
    image: '',
    manufacturer: '',
    numberPlate: '',
    price: '',
    purchaseTime: '',
    status: '',
    uid: '',
    vin: '',
    yearType: '',
    id: '',
  });
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      newInfo.purchaseTime = parseTime(e.purchaseTime)
      formData.value = newInfo;
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
      const forms = cloneDeep(formData.value);
       // @ts-ignore
      forms.purchaseTime = dayjs(formData.value.purchaseTime).valueOf();
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await bindUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await bindAdds(formData.value);
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
