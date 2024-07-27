<template>
  <a-card
    class="general-card"
    title="收入排名"
  >
    <Chart height="420px" :option="chartOption" />
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useChartOption from '@/hooks/chart-option';
  import { getDailyIncomeStatisticsListByQuery } from '@/api/dashboard';

  const parkName = ref<string[]>([]);
  const parkNameNum = ref<number[]>([]);

  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: 80,
        right: 20,
        top: 0,
        bottom: 20,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          formatter(value: number, idx: number) {
            if (idx === 0) return String(value);
            return `${Number(value)}`;
          },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#484849' : '#E5E8EF',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: parkName.value,
        axisLabel: {
          show: true,
          color: '#4E5969',
        },
        axisTick: {
          show: true,
          length: 2,
          lineStyle: {
            color: '#A9AEB8',
          },
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: isDark ? '#484849' : '#A9AEB8',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          data: parkNameNum.value,
          type: 'bar',
          barWidth: 7,
          itemStyle: {
            color: '#4086FF',
            borderRadius: 4,
          },
        },
      ],
    };
  });

  const getCurrentDateNumbers = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Month is 0-indexed, so add 1
    const day = now.getDate();
    return { year, month, day };
  };

  const fenchData = async () => {
    const { year, month, day } = getCurrentDateNumbers();
    const { code, data } = await getDailyIncomeStatisticsListByQuery({
      page: 1,
      size: 15,
      year,
      month,
      date: day,
      goodsType: 0,
      paymentAgencyShortName: '',
      statisticalModel: 'statistical_model_sum_day',
      orderByDesc: 'amount_actually_paid',
    });
    console.log(code, data);
    if (code === 10002 && data !== null) {
      for (const i of data) {
        parkName.value.unshift(i.shopName);
        parkNameNum.value.unshift(i.amountActuallyPaid);
      }
    }
  };
  fenchData();
</script>

<style scoped lang="less"></style>
