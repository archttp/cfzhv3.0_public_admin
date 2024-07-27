<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :title="$t('multiDAnalysis.card.title.contentPublishingSource')"
    >
      <Chart style="width: 100%; height: 300px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import useChartOption from '@/hooks/chart-option';
  import { getDailyIncomeStatisticsListByQuery } from '@/api/dashboard';

  const { loading } = useLoading(false);
  const goodsTypes: number[] = [1, 5, 7, 8, 12]; // 需要请求的五个goodsType
  const colorObject: any = {
    wei_xin_mp_pay_cny: '#249EFF',  //微信小程序支付
    wei_xin_app_pay_cny: '#FFA500', //微信APP支付
    cash_pay_cny: '#846BCE',  //现金支付
    ali_mp_pay_cny: '#21CCFF',  //支付宝小程序支付
    ali_app_pay_cny: '#0E42D2', //支付宝APP支付
    stored_card_pay_cny: '#FF6347', //储值卡支付
    abnormal_payment: '#4E5969',  //异常支付
    system_fund_account: '#86DF6C', //系统账户支付
    coupon: '#E5E6EB', //优惠券全额抵扣
  };
  const type1Arr: any = ref([
    {
      value: [0],
      name:'微信小程序支付',
      itemStyle: {
        color: colorObject['wei_xin_mp_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_mp_pay_cny'
    },
    {
      value: [0],
      name:'微信APP支付',
      itemStyle: {
        color: colorObject['wei_xin_app_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_app_pay_cny'
    },
    {
      value: [0],
      name:'现金支付',
      itemStyle: {
        color: colorObject['cash_pay_cny'],
      },
      paymentAgencyShortName: 'cash_pay_cny'
    },
    {
      value: [0],
      name:'支付宝小程序支付',
      itemStyle: {
        color: colorObject['ali_mp_pay_cny'],
      },
      paymentAgencyShortName: 'ali_mp_pay_cny'
    },
    {
      value: [0],
      name:'支付宝APP支付',
      itemStyle: {
        color: colorObject['ali_app_pay_cny'],
      },
      paymentAgencyShortName: 'ali_app_pay_cny'
    },
    {
      value: [0],
      name:'储值卡支付',
      itemStyle: {
        color: colorObject['stored_card_pay_cny'],
      },
      paymentAgencyShortName: 'stored_card_pay_cny'
    },
    {
      value: [0],
      name:'异常支付',
      itemStyle: {
        color: colorObject['abnormal_payment'],
      },
      paymentAgencyShortName: 'abnormal_payment'
    },
    {
      value: [0],
      name:'系统账户支付',
      itemStyle: {
        color: colorObject['system_fund_account'],
      },
      paymentAgencyShortName: 'system_fund_account'
    },
    {
      value: [0],
      name:'优惠券全额抵扣',
      itemStyle: {
        color: colorObject['coupon'],
      },
      paymentAgencyShortName: 'coupon'
    },
  ]);
  const type5Arr: any = ref([
    {
      value: [0],
      name:'微信小程序支付',
      itemStyle: {
        color: colorObject['wei_xin_mp_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_mp_pay_cny'
    },
    {
      value: [0],
      name:'微信APP支付',
      itemStyle: {
        color: colorObject['wei_xin_app_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_app_pay_cny'
    },
    {
      value: [0],
      name:'现金支付',
      itemStyle: {
        color: colorObject['cash_pay_cny'],
      },
      paymentAgencyShortName: 'cash_pay_cny'
    },
    {
      value: [0],
      name:'支付宝小程序支付',
      itemStyle: {
        color: colorObject['ali_mp_pay_cny'],
      },
      paymentAgencyShortName: 'ali_mp_pay_cny'
    },
    {
      value: [0],
      name:'支付宝APP支付',
      itemStyle: {
        color: colorObject['ali_app_pay_cny'],
      },
      paymentAgencyShortName: 'ali_app_pay_cny'
    },
    {
      value: [0],
      name:'储值卡支付',
      itemStyle: {
        color: colorObject['stored_card_pay_cny'],
      },
      paymentAgencyShortName: 'stored_card_pay_cny'
    },
    {
      value: [0],
      name:'异常支付',
      itemStyle: {
        color: colorObject['abnormal_payment'],
      },
      paymentAgencyShortName: 'abnormal_payment'
    },
    {
      value: [0],
      name:'系统账户支付',
      itemStyle: {
        color: colorObject['system_fund_account'],
      },
      paymentAgencyShortName: 'system_fund_account'
    },
    {
      value: [0],
      name:'优惠券全额抵扣',
      itemStyle: {
        color: colorObject['coupon'],
      },
      paymentAgencyShortName: 'coupon'
    },
  ]);
  const type7Arr: any = ref([
    {
      value: [0],
      name:'微信小程序支付',
      itemStyle: {
        color: colorObject['wei_xin_mp_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_mp_pay_cny'
    },
    {
      value: [0],
      name:'微信APP支付',
      itemStyle: {
        color: colorObject['wei_xin_app_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_app_pay_cny'
    },
    {
      value: [0],
      name:'现金支付',
      itemStyle: {
        color: colorObject['cash_pay_cny'],
      },
      paymentAgencyShortName: 'cash_pay_cny'
    },
    {
      value: [0],
      name:'支付宝小程序支付',
      itemStyle: {
        color: colorObject['ali_mp_pay_cny'],
      },
      paymentAgencyShortName: 'ali_mp_pay_cny'
    },
    {
      value: [0],
      name:'支付宝APP支付',
      itemStyle: {
        color: colorObject['ali_app_pay_cny'],
      },
      paymentAgencyShortName: 'ali_app_pay_cny'
    },
    {
      value: [0],
      name:'储值卡支付',
      itemStyle: {
        color: colorObject['stored_card_pay_cny'],
      },
      paymentAgencyShortName: 'stored_card_pay_cny'
    },
    {
      value: [0],
      name:'异常支付',
      itemStyle: {
        color: colorObject['abnormal_payment'],
      },
      paymentAgencyShortName: 'abnormal_payment'
    },
    {
      value: [0],
      name:'系统账户支付',
      itemStyle: {
        color: colorObject['system_fund_account'],
      },
      paymentAgencyShortName: 'system_fund_account'
    },
    {
      value: [0],
      name:'优惠券全额抵扣',
      itemStyle: {
        color: colorObject['coupon'],
      },
      paymentAgencyShortName: 'coupon'
    },
  ]);
  const type8Arr: any = ref([
    {
      value: [0],
      name:'微信小程序支付',
      itemStyle: {
        color: colorObject['wei_xin_mp_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_mp_pay_cny'
    },
    {
      value: [0],
      name:'微信APP支付',
      itemStyle: {
        color: colorObject['wei_xin_app_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_app_pay_cny'
    },
    {
      value: [0],
      name:'现金支付',
      itemStyle: {
        color: colorObject['cash_pay_cny'],
      },
      paymentAgencyShortName: 'cash_pay_cny'
    },
    {
      value: [0],
      name:'支付宝小程序支付',
      itemStyle: {
        color: colorObject['ali_mp_pay_cny'],
      },
      paymentAgencyShortName: 'ali_mp_pay_cny'
    },
    {
      value: [0],
      name:'支付宝APP支付',
      itemStyle: {
        color: colorObject['ali_app_pay_cny'],
      },
      paymentAgencyShortName: 'ali_app_pay_cny'
    },
    {
      value: [0],
      name:'储值卡支付',
      itemStyle: {
        color: colorObject['stored_card_pay_cny'],
      },
      paymentAgencyShortName: 'stored_card_pay_cny'
    },
    {
      value: [0],
      name:'异常支付',
      itemStyle: {
        color: colorObject['abnormal_payment'],
      },
      paymentAgencyShortName: 'abnormal_payment'
    },
    {
      value: [0],
      name:'系统账户支付',
      itemStyle: {
        color: colorObject['system_fund_account'],
      },
      paymentAgencyShortName: 'system_fund_account'
    },
    {
      value: [0],
      name:'优惠券全额抵扣',
      itemStyle: {
        color: colorObject['coupon'],
      },
      paymentAgencyShortName: 'coupon'
    },
  ]);
  const type12Arr: any = ref([
    {
      value: [0],
      name:'微信小程序支付',
      itemStyle: {
        color: colorObject['wei_xin_mp_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_mp_pay_cny'
    },
    {
      value: [0],
      name:'微信APP支付',
      itemStyle: {
        color: colorObject['wei_xin_app_pay_cny'],
      },
      paymentAgencyShortName: 'wei_xin_app_pay_cny'
    },
    {
      value: [0],
      name:'现金支付',
      itemStyle: {
        color: colorObject['cash_pay_cny'],
      },
      paymentAgencyShortName: 'cash_pay_cny'
    },
    {
      value: [0],
      name:'支付宝小程序支付',
      itemStyle: {
        color: colorObject['ali_mp_pay_cny'],
      },
      paymentAgencyShortName: 'ali_mp_pay_cny'
    },
    {
      value: [0],
      name:'支付宝APP支付',
      itemStyle: {
        color: colorObject['ali_app_pay_cny'],
      },
      paymentAgencyShortName: 'ali_app_pay_cny'
    },
    {
      value: [0],
      name:'储值卡支付',
      itemStyle: {
        color: colorObject['stored_card_pay_cny'],
      },
      paymentAgencyShortName: 'stored_card_pay_cny'
    },
    {
      value: [0],
      name:'异常支付',
      itemStyle: {
        color: colorObject['abnormal_payment'],
      },
      paymentAgencyShortName: 'abnormal_payment'
    },
    {
      value: [0],
      name:'系统账户支付',
      itemStyle: {
        color: colorObject['system_fund_account'],
      },
      paymentAgencyShortName: 'system_fund_account'
    },
    {
      value: [0],
      name:'优惠券全额抵扣',
      itemStyle: {
        color: colorObject['coupon'],
      },
      paymentAgencyShortName: 'coupon'
    },
  ]);

  // @ts-ignore
  const { chartOption } = useChartOption((isDark) => {
    const graphicElementStyle = {
      textAlign: 'center',
      fill: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
      fontSize: 14,
      lineWidth: 10,
      fontWeight: 'bold',
    };
    return {
      legend: {
        left: 'center',
        data: [
          '微信小程序支付',
          '微信APP支付',
          '现金支付',
          '支付宝小程序支付',
          '支付宝APP支付',
          '储值卡支付',
          '异常支付',
          '系统账户支付',
          '优惠券全额抵扣',
        ],
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        textStyle: {
          color: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
        },
        itemStyle: {
          borderWidth: 0,
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: '8.3%',
            top: 'center',
            style: {
              text: '停车缴费',
              ...graphicElementStyle,
            },
          },
          {
            type: 'text',
            left: '28%',
            top: 'center',
            style: {
              text: '套餐缴费',
              ...graphicElementStyle,
            },
          },
          {
            type: 'text',
            left: '48%',
            top: 'center',
            style: {
              text: '储值卡充值',
              ...graphicElementStyle,
            },
          },
          {
            type: 'text',
            left: '68%',
            top: 'center',
            style: {
              text: '汽车充电',
              ...graphicElementStyle,
            },
          },
          {
            type: 'text',
            left: '87.8%',
            top: 'center',
            style: {
              text: '电动车充电',
              ...graphicElementStyle,
            },
          },
        ],
      },
      series: [
        initializeSeriesData(isDark, '10%', type1Arr.value),
        initializeSeriesData(isDark, '30%', type5Arr.value),
        initializeSeriesData(isDark, '50%', type7Arr.value),
        initializeSeriesData(isDark, '70%', type8Arr.value),
        initializeSeriesData(isDark, '90%', type12Arr.value),
      ],
    };
  });

  const initializeSeriesData = (
    isDark: boolean,
    leftOffset: string,
    targetArray: any
  ) => {
    return {
      type: 'pie',
      radius: ['50%', '70%'],
      center: [leftOffset, '50%'],
      label: {
        formatter: '{d}% ',
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
      },
      itemStyle: {
        borderColor: isDark ? '#000' : '#fff',
        borderWidth: 1,
      },
      data: targetArray,
    };
  };

  const getCurrentDateNumbers = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return { year, month, day };
  };

  // 统一请求不同goodsType数据
  const fetchDataPromise = async (goodsTypes: number[]) => {
    const { year, month, day } = getCurrentDateNumbers();
    const promises = goodsTypes.map(async (type) => {
      const { code, data } = await getDailyIncomeStatisticsListByQuery({
        page: 1,
        size: 200,
        year,
        month,
        date: day,
        statisticalModel: 'statistical_model_sum_day',
        shopId: 0,
        goodsType: type,
      });
      return { type, code, data };
    });

    const results = await Promise.all(promises);
    return results;
  };

  // 赋值图表
  const processDataArray = (dataArray: any, typeArr: any) => {
    for(const dataEl of dataArray.data){
      for(const typeEl of typeArr.value){
        if(dataEl.paymentAgencyShortName==typeEl.paymentAgencyShortName){
          typeEl.value = [dataEl.amountActuallyPaid];
        }
      }
    }
  };

  const fenchData = async () => {
    try {
      const results = await fetchDataPromise(goodsTypes);
      const targetArray = [type1Arr, type5Arr, type7Arr, type8Arr, type12Arr];
      for (let i = 0; i < targetArray.length; i++) {
        if(results[i].data){
          processDataArray(results[i], targetArray[i]);
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  };
  fenchData();
</script>

<style scoped lang="less"></style>
