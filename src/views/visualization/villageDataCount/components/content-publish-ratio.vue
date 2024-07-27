<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title> 社区类型/物业费/设备数量(月数据) </template>
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
  import { getDailyVillageStatistcsListByQuery } from '@/api/visualization';
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
  const residenceVillageCounts = ref<number[]>([]);
  const officeVillageCounts = ref<number[]>([]);
  const downtownVillageCounts = ref<number[]>([]);
  const industryVillageCounts = ref<number[]>([]);
  const organizationVillageCounts = ref<number[]>([]);
  const propertyFeesOverpaymentCounts = ref<number[]>([]);
  const propertyFeesLateFeeCounts = ref<number[]>([]);
  const deviceCounts = ref<number[]>([]);
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
          name: '住宅小区',
          data: residenceVillageCounts.value,
          stack: 'one',
          type: 'bar',
          barWidth: 16,
          color: isDark ? '#085FEF' : '#00B2FF ',
        },
        {
          name: '办公区',
          data: officeVillageCounts.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? 'green' : 'green',
        },
        {
          name: '商业区',
          data: downtownVillageCounts.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? 'yellow' : 'yellow',
          itemStyle: {
            borderRadius: 2,
          },
        },
        {
          name: '工业区',
          data: industryVillageCounts.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? '#B22222' : '#B22222',
          itemStyle: {
            borderRadius: 2,
          },
        },
        {
          name: '组织机构区',
          data: organizationVillageCounts.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? '#9400D3' : '#9400D3',
          itemStyle: {
            borderRadius: 2,
          },
        },
        {
          name: '物业费逾缴笔数',
          data: propertyFeesOverpaymentCounts.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? '#FF0000' : '#FF0000',
          itemStyle: {
            borderRadius: 2,
          },
        },
        {
          name: '物业费滞纳金额',
          data: propertyFeesLateFeeCounts.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? '#008B8B' : '#008B8B',
          itemStyle: {
            borderRadius: 2,
          },
        },
        {
          name: '人脸设备数',
          data: deviceCounts.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? '#90EE90' : '#90EE90',
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
      const { data } = await getDailyVillageStatistcsListByQuery({
        params: {
          page: 1,
          size: 200,
          villageId: 0,
          minStartTime: timestamps.timestampOneMonthAgo,
          maxEndTime: timestamps.timestampLastSecondOfCurrentDay,
          statisticalModel: 'statistical_model_sum_day'
        },
      });
      for (const i of data) {
        xAxis.value.push(i.year + '-' + i.month + '-' + i.date);
        residenceVillageCounts.value.push(i.residenceVillageCounts);
        officeVillageCounts.value.push(i.officeVillageCounts);
        downtownVillageCounts.value.push(i.downtownVillageCounts);
        industryVillageCounts.value.push(i.industryVillageCounts);
        organizationVillageCounts.value.push(i.organizationVillageCounts);
        propertyFeesOverpaymentCounts.value.push(i.propertyFeesOverpaymentCounts);
        propertyFeesLateFeeCounts.value.push(i.propertyFeesLateFeeCounts);
        deviceCounts.value.push(i.deviceCounts);
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
