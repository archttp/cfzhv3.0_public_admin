<template>
  <a-form ref="formRef" :model="formData" style="margin-top: 32px">
    <a-form-item field="qualification_type" label="所属行业" required>
      <a-cascader
        v-model="formData.qualification_type"
        :options="options"
        :style="{ width: '320px' }"
        placeholder="请选择"
      />
    </a-form-item>
    <a-form-item
      v-if="formData.qualification_type"
      field="activities_rate"
      label="结算费率"
      required
    >
      <a-input
        v-model="formData.activities_rate"
        placeholder="请输入"
        default-value="0.6"
        disabled
      />
    </a-form-item>

    <!-- <a-form-item
      v-if="formData.qualification_type"
      field="settlement_id"
      label="入驻结算规则ID"
      required
    >
      <a-input v-model="formData.settlement_id" placeholder="请输入" />
    </a-form-item> -->
    <a-form-item
      v-if="formData.qualification_type"
      label="优惠费率活动（选填）"
    >
      <a-input v-model="formData.activities_id" placeholder="请输入" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" style="margin-right: 16px" @click="onLast">
        上一步
      </a-button>
      <a-button type="primary" @click="onNext"> 下一步 </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  const formRef = ref();
  const emit = defineEmits(['changeStep', 'change-step']);
  const formData = ref({
    activities_additions: [],
    activities_id: '',
    activities_rate: '0.6',
    qualification_type: '',
    qualifications: [],
    settlement_id: '',
  });
  const options = [
    {
      value: '餐饮/零售',
      label: '餐饮/零售',
      children: [
        {
          value: '餐饮',
          label: '餐饮',
        },
        {
          value: '零售',
          label: '零售',
        },
        {
          value: '食品生鲜',
          label: '食品生鲜',
        },
      ],
    },
    {
      value: '交通/加油',
      label: '交通/加油',
      children: [
        {
          value: '快递',
          label: '快递',
        },
        {
          value: '物流',
          label: '物流',
        },
        {
          value: '加油/加气',
          label: '加油/加气',
        },
      ],
    },
  ];

  const onLast = () => {
    emit('changeStep', 2);
  };

  onMounted(() => {
    if (localStorage.getItem('individual-Industry')) {
      // @ts-ignore
      formData.value = JSON.parse(localStorage.getItem('individual-Industry'));
    }
  });

  const onNext = () => {
    formRef.value.validate((valid: any) => {
      console.log(valid);
      if (valid !== undefined) return false;
      // @ts-ignore
      localStorage.setItem(
        'individual-Industry',
        JSON.stringify(formData.value)
      );
      emit('changeStep', 4);
      return true;
    });
  };
</script>
