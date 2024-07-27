<template>
  <a-card
    class="general-card"
    :title="$t('dataAnalysis.title.publicOpinion')"
    :header-style="{ paddingBottom: '12px' }"
    
  >
    <a-grid :cols="24" :col-gap="12" :row-gap="12" v-if="shows">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总停车次数"
          :count="state.parkingCounts"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总临时车停车次数"
          :count="state.parkingTemporaryCounts"
          :card-style="{
            background: isDark
              ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
              : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总车位数"
          :count="state.parkingSpace"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #294B94 0%, #0F275C 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总停车时间(小时)"
          :count="state.parkingTimeCounts"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
              : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
          }"
        />
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import useThemes from '@/hooks/themes';
  import ChainItem from './chain-item.vue';
  import { reactive,ref } from 'vue';
  import { getDailyParkingStatistcsListByQuery } from '@/api/visualization';

  const { isDark } = useThemes();

  const shows = ref(false)

  const state = reactive({
    parkingCounts: 0,
    parkingTemporaryCounts: 0,
    parkingSpace: 0,
    parkingTimeCounts: 0,
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return { year, month, day };
  };

  const fenchData = async () => {
    const { year, month, day } = getCurrentDate();
    const { data, code } = await getDailyParkingStatistcsListByQuery({
      params: {
        page: 1,
        size: 200,
        carParkId: 0,
        year,
        month,
        date: day,
        statisticalModel: 'statistical_model_sum'
      },
    });
    console.log(data, code);
    shows.value = true
    if (code === 10002) {
      
      state.parkingCounts = data[0].parkingCounts;
      state.parkingTemporaryCounts = data[0].parkingTemporaryCounts;
      state.parkingSpace = data[0].parkingSpace;
      state.parkingTimeCounts = data[0].parkingTimeCounts;
    }
  };
  fenchData();
</script>
