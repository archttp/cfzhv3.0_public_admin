<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :title="$t('multiDAnalysis.card.title.dataOverview')"
    >
      <a-row justify="space-between">
        <a-col v-for="(item, idx) in renderData" :key="idx" :span="6">
          <a-statistic
            :title="item.title"
            :value="item.value"
            show-group-separator
            :value-from="0"
            animation
          >
            <template #prefix>
              <span
                class="statistic-prefix"
                :style="{ background: item.prefix.background }"
              >
                <component
                  :is="item.prefix.icon"
                  :style="{ color: item.prefix.iconColor }"
                />
              </span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
      <Chart style="height: 328px; margin-top: 20px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { LineSeriesOption } from 'echarts';
  import { getDailyIncomeStatisticsListByQuery } from '@/api/visualization';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useThemes from '@/hooks/themes';
  import useChartOption from '@/hooks/chart-option';
  import Mock from 'mockjs';
  import setupMock, { successResponseWrap } from '@/utils/setup-mock';
  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${
            el.color
          }" class="tooltip-item-icon"></span><span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">${el.value.toLocaleString()}</span>
      </div>`
      )
      .reverse()
      .join('');
  };

  const generateSeries = (
    name: string,
    lineColor: string,
    itemBorderColor: string,
    data: number[]
  ): LineSeriesOption => {
    return {
      name,
      data,
      stack: 'Total',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        color: lineColor,
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          color: lineColor,
          borderWidth: 2,
          borderColor: itemBorderColor,
        },
      },
      lineStyle: {
        width: 2,
        color: lineColor,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.1,
        color: lineColor,
      },
    };
  };
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const { isDark } = useThemes();

  const temporaryParkingFeeValue = ref(0);
  const parkingPackageValue = ref(0);
  const carChargeValue = ref(0);
  const electricBicycleChargingValue = ref(0);

  const renderData = computed(() => [
    {
      title: '临停车费',
      value: temporaryParkingFeeValue.value,
      prefix: {
        icon: 'icon-edit',
        background: isDark.value ? '#593E2F' : '#FFE4BA',
        iconColor: isDark.value ? '#F29A43' : '#F77234',
      },
    },
    {
      title: '停车套餐',
      value: parkingPackageValue.value,
      prefix: {
        icon: 'icon-thumb-up',
        background: isDark.value ? '#3D5A62' : '#E8FFFB',
        iconColor: isDark.value ? '#6ED1CE' : '#33D1C9',
      },
    },
    {
      title: '汽车充电',
      value: carChargeValue.value,
      prefix: {
        icon: 'icon-heart',
        background: isDark.value ? '#354276' : '#E8F3FF',
        iconColor: isDark.value ? '#4A7FF7' : '#165DFF',
      },
    },
    {
      title: '电动车充电',
      value: electricBicycleChargingValue.value,
      prefix: {
        icon: 'icon-user',
        background: isDark.value ? '#3F385E' : '#F5E8FF',
        iconColor: isDark.value ? '#8558D3' : '#722ED1',
      },
    },
  ]);
  const xAxis = ref<string[]>([]);
  const contentProductionData = ref<number[]>([]);
  const contentClickData = ref<number[]>([]);
  const contentExposureData = ref<number[]>([]);
  const activeUsersData = ref<number[]>([]);
  const { chartOption } = useChartOption((dark) => {
    return {
      grid: {
        left: '2.6%',
        right: '4',
        top: '40',
        bottom: '40',
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return '';
            if (idx === xAxis.value.length - 1) return '';
            return `${value}`;
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: number, idx: number) {
            if (idx === 0) return String(value);
            return `${value / 1000}k`;
          },
        },
        splitLine: {
          lineStyle: {
            color: dark ? '#2E2E30' : '#F2F3F5',
          },
        },
      },
      tooltip: {
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
      // graphic: {
      //   elements: [
      //     {
      //       type: 'text',
      //       left: '2.6%',
      //       bottom: '18',
      //       style: {
      //         text: '12.10',
      //         textAlign: 'center',
      //         fill: '#4E5969',
      //         fontSize: 12,
      //       },
      //     },
      //     {
      //       type: 'text',
      //       right: '0',
      //       bottom: '18',
      //       style: {
      //         text: '12.17',
      //         textAlign: 'center',
      //         fill: '#4E5969',
      //         fontSize: 12,
      //       },
      //     },
      //   ],
      // },
      series: [
        generateSeries(
          '临停车费',
          '#722ED1',
          '#F5E8FF',
          contentProductionData.value
        ),
        generateSeries(
          '停车套餐',
          '#F77234',
          '#FFE4BA',
          contentClickData.value
        ),
        generateSeries(
          '汽车充电',
          '#33D1C9',
          '#E8FFFB',
          contentExposureData.value
        ),
        generateSeries(
          '充电车充电',
          '#3469FF',
          '#E8F3FF',
          activeUsersData.value
        ),
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

  // const getTemporaryParkingFee = async () => {
  //   const timestamps = getTimestampsForLastMonth();
  //   setLoading(true);
  //   try {
  //     const { data,code } = await getDailyIncomeStatisticsListByQuery({
  //       params: {
  //         page: 1,
  //         size: 200,
  //         carParkId: 0,
  //         minStartTime: timestamps.timestampOneMonthAgo,
  //         maxEndTime: timestamps.timestampLastSecondOfCurrentDay,
  //         paymentAgencyShortName: '',
  //         shopId: 0,
  //         goodsType: 1,
  //       },
  //     });
  //     console.log(data, '临时停车费用');
  //     if(code === 10002){
  //       const totalAmountPaid = data.reduce((total: any, obj: any) => total + obj.amountActuallyPaid, 0);
  //       temporaryParkingFeeValue.value = totalAmountPaid
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // getTemporaryParkingFee();

  async function fetchDataForDifferentGoodsTypes() {
    setLoading(true);
    const timestamps = getTimestampsForLastMonth();
    // 1-停车/2-充值/3-洗车/4-转账/5-停车套餐/6-车位预订/7-优惠券活动充值/8-汽车充电/9-提现/10-退款/11-收款/12-电动车充电
    const goodsTypes = [1, 5, 8, 12];
    const results = [];
    for (const goodsType of goodsTypes) {
      const { data, code } = await getDailyIncomeStatisticsListByQuery({
        params: {
          page: 1,
          size: 200,
          minStartTime: timestamps.timestampOneMonthAgo,
          maxEndTime: timestamps.timestampLastSecondOfCurrentDay,
          paymentAgencyShortName: '',
          shopId: 0,
          goodsType: goodsType,
          statisticalModel: 'statistical_model_sum_day',
        },
      });
      let totalAmountPaid;
      if (Array.isArray(data)) {
        // 计算当前 goodsType 对应的总金额
        totalAmountPaid = data.reduce(
          (total: any, obj: any) => total + obj.amountActuallyPaid,
          0
        );
      } else {
        totalAmountPaid = 0;
      }

      results.push({ goodsType, data, code, totalAmountPaid });
    }
    return results;
  }

  // 调用函数并处理结果
  fetchDataForDifferentGoodsTypes()
    .then((results) => {
      setLoading(false);
      console.log(results, 888); // 输出包含不同 goodsType 请求结果的数组
      if (results[0].code === 10002) {
        temporaryParkingFeeValue.value = results[0].totalAmountPaid;
        for (const i of results[0].data) {
          xAxis.value.push(i.title);
          contentProductionData.value.push(i.amountActuallyPaid)
        }
      }
      if (results[1].code === 10002){
        parkingPackageValue.value = results[1].totalAmountPaid;
        for (const i of results[1].data) {
          contentClickData.value.push(i.amountActuallyPaid)
        }
      }
        
      if (results[2].code === 10002){
        carChargeValue.value = results[2].totalAmountPaid;
        for (const i of results[2].data) {
          contentExposureData.value.push(i.amountActuallyPaid)
        }
      }
      if (results[3].code === 10002){
        electricBicycleChargingValue.value = results[3].totalAmountPaid;
        for (const i of results[3].data) {
          activeUsersData.value.push(i.amountActuallyPaid)
        }
        
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
</script>

<style scoped lang="less">
  :deep(.arco-statistic) {
    .arco-statistic-title {
      color: rgb(var(--gray-10));
      font-weight: bold;
    }
    .arco-statistic-value {
      display: flex;
      align-items: center;
    }
  }
  .statistic-prefix {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    color: var(--color-white);
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
  }
</style>
