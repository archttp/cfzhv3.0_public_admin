<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '16px' }">
      <template #title>
        {{ $t('dataAnalysis.contentChargingPeriodAnalysis') }}
      </template>
      <Chart style="width: 100%; height: 370px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { queryContentPeriodAnalysis } from '@/api/visualization';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useChartOption from '@/hooks/chart-option';
  import { getDailyChargingStatistcsListByQuery } from '@/api/visualization';
  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
          <span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">
        ${el.value}
        </span>
      </div>`
      )
      .join('');
  };

  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const bicycleChargingCount = ref<number[]>([]);
  const carChargingCount = ref<number[]>([]);

  const bicycleChargingKwhCount = ref<number[]>([]);
  const carChargingKwhCount = ref<number[]>([]);
  const bicycleDeviceCounts = ref<number[]>([]);
  const carDeviceCounts = ref<number[]>([]);
  const bicycleAbnormalCounts = ref<number[]>([]);
  const carAbnormalCounts = ref<number[]>([]);

  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: '40',
        right: 0,
        top: '20',
        bottom: '100',
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
        boundaryGap: false,
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
          interval(idx: number) {
            if (idx === 0) return false;
            if (idx === xAxis.value.length - 1) return false;
            return true;
          },
        },
        axisLabel: {
          color: '#86909C',
          formatter(value: number, idx: number) {
            if (idx === 0) return '';
            if (idx === xAxis.value.length - 1) return '';
            return `${value}`;
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#86909C',
          formatter: '{value}',
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
          name: '自行车充电次数',
          data: bicycleChargingCount.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#3D72F6' : '#246EFF',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#E0E3FF',
            },
          },
        },
        {
          name: '汽车充电次数',
          data: carChargingCount.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#A079DC' : '#00B2FF',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#E2F2FF',
            },
          },
        },
        {
          name: '自行车充电度数',
          data: bicycleChargingKwhCount.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#6CAAF5' : '#81E2FF',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#D9F6FF',
            },
          },
        },
        {
          name: '汽车充电度数',
          data: carChargingKwhCount.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#FFDCA2' : '#FFA2A2',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#D9F6FF',
            },
          },
        },
        {
          name: '自行车充电设备数量',
          data: bicycleDeviceCounts.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#7F7F7F' : '#BEBEBE',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#D9F6FF',
            },
          },
        },
        {
          name: '汽车充电设备数量',
          data: carDeviceCounts.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#9A68DF' : '#D19FE8',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#D9F6FF',
            },
          },
        },
        {
          name: '自行车充电异常次数',
          data: bicycleAbnormalCounts.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#FF9F6B' : '#FFDCA2',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#D9F6FF',
            },
          },
        },
        {
          name: '汽车充电异常次数',
          data: carAbnormalCounts.value,
          type: 'line',
          smooth: true,
          showSymbol: false,
          color: isDark ? '#2E8B57' : '#2E8B57',
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#D9F6FF',
            },
          },
        },
      ],
      dataZoom: [
        {
          bottom: 40,
          type: 'slider',
          left: 40,
          right: 14,
          height: 14,
          borderColor: 'transparent',
          handleIcon:
            'image://http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/1ee5a8c6142b2bcf47d2a9f084096447.svg~tplv-49unhts6dw-image.image',
          handleSize: '20',
          handleStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 4,
          },
          brushSelect: false,
          backgroundColor: isDark ? '#313132' : '#F2F3F5',
        },
        {
          type: 'inside',
          start: 0,
          // end: 100,
          zoomOnMouseWheel: false,
        },
      ],
    };
  });

  const getTimestampsForLastMonth = () => {
    const currentDate = new Date();

    // Calculate one month ago from the current date
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0); // Set to 00:00:00

    // Calculate the last second of the current day
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
      const { data } = await getDailyChargingStatistcsListByQuery({
        params: {
          page: 1,
          size: 200,
          chargingStationId: 0,
          minStartTime: timestamps.timestampOneMonthAgo,
          maxEndTime: timestamps.timestampLastSecondOfCurrentDay,
          statisticalModel: 'statistical_model_sum_day'
        },
      });
      console.log(data, 225);
      for (const i of data) {
        xAxis.value.push(i.year + '-' + i.month + '-' + i.date);
        bicycleChargingCount.value.push(i.bicycleChargingCount);
        carChargingCount.value.push(i.carChargingCount);
        bicycleChargingKwhCount.value.push(i.bicycleChargingKwhCount);
        carChargingKwhCount.value.push(
          i.carChargingKwhCount
        );
        bicycleDeviceCounts.value.push(
          i.bicycleDeviceCounts
        );
        carDeviceCounts.value.push(i.carDeviceCounts);
        bicycleAbnormalCounts.value.push(i.bicycleAbnormalCounts);
        carAbnormalCounts.value.push(i.carAbnormalCounts);
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .chart-box {
    width: 100%;
    height: 230px;
  }
</style>
