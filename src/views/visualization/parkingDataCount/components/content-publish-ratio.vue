<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title> 车辆月报(月数据) </template>
      <!-- <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template> -->
      <Chart style="width: 100%; height: 347px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import { getDailyParkingStatistcsListByQuery } from '@/api/visualization';
  import useLoading from '@/hooks/loading';
  import {
    queryContentPublish,
    ContentPublishRecord,
  } from '@/api/visualization';
  import useChartOption from '@/hooks/chart-option';
  import Mock from 'mockjs';

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
    <p>
      <span style="background-color: ${
        el.color
      }" class="tooltip-item-icon"></span>
      <span>
      ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toLocaleString()}
    </span>
  </div>`
      )
      .join('');
  };

  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const blueChartsData = ref<number[]>([]);
  const greenChartsData = ref<number[]>([]);
  const yellowChartsData = ref<number[]>([]);
  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: '4%',
        right: 0,
        top: '20',
        bottom: '60',
      },
      legend: {
        bottom: 0,
        icon: 'circle',
        textStyle: {
          color: '#4E5969',
        },
      },
      xAxis: {
        type: 'category',
        data: xAxis.value,
        axisLine: {
          lineStyle: {
            color: isDark ? '#3f3f3f' : '#A9AEB8',
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: '#86909C',
          },
        },
        axisLabel: {
          color: '#86909C',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#86909C',
          formatter(value: number, idx: number) {
            if (idx === 0) return `${value}`;
            return `${value / 1000}k`;
          },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#3F3F3F' : '#E5E6EB',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      series: [
        {
          name: '蓝牌车',
          data: blueChartsData.value,
          stack: 'one',
          type: 'bar',
          barWidth: 16,
          color: isDark ? '#085FEF' : '#00B2FF ',
        },
        {
          name: '绿牌车',
          data: greenChartsData.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? 'green' : 'green',
        },
        {
          name: '黄牌车',
          data: yellowChartsData.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? 'yellow' : 'yellow',
          itemStyle: {
            borderRadius: 2,
          },
        },
      ],
    };
  });

  const getTimestampsForLastMonth = () => {
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0); // Set to 00:00:00
    const lastSecondOfCurrentDay = new Date(currentDate);
    lastSecondOfCurrentDay.setHours(23, 59, 59, 999);
    const timestampOneMonthAgo = Math.floor(oneMonthAgo.getTime()); // Milliseconds
    const timestampLastSecondOfCurrentDay = Math.floor(
      lastSecondOfCurrentDay.getTime()
    ); // Milliseconds
    return {
      timestampOneMonthAgo,
      timestampLastSecondOfCurrentDay,
    };
  };

  const fetchData = async () => {
    const timestamps = getTimestampsForLastMonth();
    setLoading(true);
    try {
      const { data } = await getDailyParkingStatistcsListByQuery({
        params: {
          page: 1,
          size: 200,
          carParkId: 0,
          minStartTime: timestamps.timestampOneMonthAgo,
          maxEndTime: timestamps.timestampLastSecondOfCurrentDay,
          statisticalModel: 'statistical_model_sum_day'
        },
      });
      for (const i of data) {
        xAxis.value.push(i.year + '-' + i.month + '-' + i.date);
        blueChartsData.value.push(i.blueNumberPlateCounts);
        greenChartsData.value.push(i.greenNumberPlateCounts);
        yellowChartsData.value.push(i.yellowNumberPlateCounts);
      }
      setLoading(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less"></style>
