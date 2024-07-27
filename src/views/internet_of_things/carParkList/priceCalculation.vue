<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="600"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-col>
            <a-form-item label="停车场" field="carParkId" required>
              <a-select
                :loading="loading"
                placeholder="请输入"
                allow-search
                allow-clear
                @search="handleSelectSearch"
                :filter-option="false"
                v-model="formData.carParkId"
              >
                <a-option v-for="item of parkList" :value="item.id">{{
                  item.name
                }}</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              label="车牌号"
              field="numberPlate"
              validate-trigger="input"
              required
            >
              <a-input
                v-model="formData.numberPlate"
                placeholder="请输入"
                allow-clear
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              label="进场时间"
              field="inTime"
              validate-trigger="input"
              required
            >
              <a-date-picker
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="formData.inTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item
              label="出场时间"
              field="outTime"
              validate-trigger="input"
              required
            >
              <a-date-picker
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="formData.outTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-space>
        <div class="actions">
          <a-space>
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
  import { costMeasurement, cfCarParkSearch } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import dayjs from 'dayjs';

  const visible = ref(false);
  const loading = ref(false);
  const selectLoading = ref(false);
  const modalTitle = ref('价格测算');
  const parkList = ref([]);
  const formRef = ref();
  const formData = ref({
    carParkId: '',
    inTime: '',
    outTime: '',
    numberPlate: '',
  });
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
  const handleClick = () => {
    visible.value = true;
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      const newForm = cloneDeep(formData.value);
      // @ts-ignore
      newForm.inTime = dayjs(formData.value.inTime).valueOf();
      // @ts-ignore
      newForm.outTime = dayjs(formData.value.outTime).valueOf();
      // @ts-ignore
      const { code, message, data } = await costMeasurement({
        params: newForm,
      });
      if (code === 10002) {
        alert('价格测算结果：' + data.cfOrder.amountsPayable + ' 元');
      } else {
        // @ts-ignore
        Message.error(message);
      }
    });
  };

  const resetFields = () => {
    formRef.value.resetFields();
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
