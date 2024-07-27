<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1200" draggable :footer="false" @close="resetFields">
      <template #title>
        {{ formData?.id ? '编辑活动' : '新增活动' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="手机" field="phone" validate-trigger="input" required>
                  <a-input v-model="formData.phone" placeholder="请输入手机" allow-clear></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="标题" field="title" validate-trigger="input" required>
                  <a-input v-model="formData.title" placeholder="请输入标题" allow-clear></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="类型" field="type" validate-trigger="input" required>
                  <a-select v-model="formData.type" placeholder="请选择类型" allow-clear>
                    <a-option :value="0">通用</a-option>
                    <a-option :value="1">停车场</a-option>
                    <a-option :value="2">传统商城</a-option>
                    <a-option :value="3">充电</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="开始时间" field="startTime" required>
                  <a-date-picker v-model="formData.startTime" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="结束时间" field="endTime" required>
                  <a-date-picker v-model="formData.endTime" show-time format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="服务商手机号(物业经理请填写您上级运营商手机号)" field="ipsPhone" validate-trigger="input">
                  <a-input v-model="formData.ipsPhone" placeholder="物业经理请填写您上级运营商手机号" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="活动状态" field="activityStatus">
                  <a-select v-model="formData.activityStatus" placeholder="请选择活动状态" allow-clear>
                    <a-option :value="0">暂停</a-option>
                    <a-option :value="1">正常</a-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="发券要求服务中" field="requireInService" validate-trigger="input">
                  <a-select v-model="formData.requireInService" placeholder="请选择" allow-clear>
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="每日可领次数" field="repeatTimes" validate-trigger="input">
                  <a-input v-model="formData.repeatTimes" placeholder="0表示无限制" allow-clear></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="店主名称" field="shopkeeperName" validate-trigger="input">
                  <a-input v-model="formData.shopkeeperName" placeholder="请输入店主名称" allow-clear></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card class="general-card">
            <template #title> 金额券 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="剩余金额(金额券)" field="remainingQuantity" validate-trigger="input">
                  <a-input v-model="formData.remainingQuantity" placeholder="请输入剩余数量" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="金额券充值比例(例如为10充1得10)" field="rechargeRatio" validate-trigger="input">
                  <a-input v-model="formData.rechargeRatio" placeholder="请输入充值比例" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="金额券每日上限(0为不限制)" field="amountDailyLimit" validate-trigger="input">
                  <a-input v-model="formData.amountDailyLimit" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="金额券有效期(小时)" field="amountTermValidity" validate-trigger="input">
                  <a-input v-model="formData.amountTermValidity" placeholder="请输入"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="金额券二维码重复使用" field="amountQrcodeMultiplex" validate-trigger="input">
                  <a-select v-model="formData.amountQrcodeMultiplex" placeholder="请选择" allow-clear>
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否自动赠送" field="autoGiveAway" validate-trigger="input">
                  <a-select v-model="formData.autoGiveAway" placeholder="请选择" allow-clear>
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="自动赠送日期" field="autoGiveAwayDate" validate-trigger="input">
                  <a-input v-model="formData.autoGiveAwayDate" placeholder="请输入自动赠送日期 范围 01-31" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="自动赠送余量" field="autoGiveAwayOverageQuota" validate-trigger="input">
                  <a-input v-model="formData.autoGiveAwayOverageQuota" placeholder="请输入自动赠送余量" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="自动赠送配额" field="autoGiveAwayQuota" validate-trigger="input">
                  <a-input v-model="formData.autoGiveAwayQuota" placeholder="请输入自动赠送配额" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="自动赠送时间" field="autoGiveAwayTime" validate-trigger="input">
                  <a-date-picker v-model="formData.autoGiveAwayTime" show-time placeholder="请选择"
                                 allow-clear disabled></a-date-picker>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否自动清零" field="autoCleared" validate-trigger="input">
                  <a-select v-model="formData.autoCleared" placeholder="请选择" allow-clear>
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card class="general-card">
            <template #title> 时长券 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="剩余时长(时长券 单位小时)" field="remainingTime" validate-trigger="input">
                  <a-input v-model="formData.remainingTime" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时长券价格" field="timeCouponPrice" validate-trigger="input">
                  <a-input v-model="formData.timeCouponPrice" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时长券每日上限(0为不限制)" field="timeDailyLimit" validate-trigger="input">
                  <a-input v-model="formData.timeDailyLimit" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时长券有效期(小时)" field="timeTermValidity" validate-trigger="input">
                  <a-input v-model="formData.timeTermValidity" placeholder="请输入"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时长券二维码重复使用" field="timeQrcodeMultiplex" validate-trigger="input">
                  <a-select v-model="formData.timeQrcodeMultiplex" placeholder="请选择" allow-clear>
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card class="general-card">
            <template #title> 次数券 </template>
            <a-row :gutter="80">
<!--              <a-col :span="8">-->
<!--                <a-form-item label="优惠券类型" field="couponType" validate-trigger="input">-->
<!--                  <a-select v-model="formData.couponType" placeholder="请选择" allow-clear>-->
<!--                    <a-option :value="1">次数券</a-option>-->
<!--                    <a-option :value="2">金额券</a-option>-->
<!--                    <a-option :value="3">时长券</a-option>-->
<!--                  </a-select>-->
<!--                </a-form-item>-->
<!--              </a-col>-->
              <!-- <a-col :span="8">
                <a-form-item label="优惠券面额" field="denomination" validate-trigger="input">
                  <a-input v-model="formData.denomination" placeholder="请输入面额" allow-clear></a-input>
                </a-form-item>
              </a-col> -->

              <!-- <a-col :span="8">
                <a-form-item label="指定商品id(为空则不指定)" field="goodsId" validate-trigger="input">
                  <a-input v-model="formData.goodsId" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col> -->
              <!-- <a-col :span="8">
                <a-form-item label="图片地址" field="image" validate-trigger="input">
                  <a-input v-model="formData.image" placeholder="请输入图片地址" allow-clear></a-input>
                </a-form-item>
              </a-col> -->
              <!-- <a-col :span="8">
                <a-form-item label="活动简介" field="introduction" validate-trigger="input">
                  <a-input v-model="formData.introduction" placeholder="请输入活动简介" allow-clear></a-input>
                </a-form-item>
              </a-col> -->
<!--              <a-col :span="8">-->
<!--                <a-form-item label="已发行量" field="issuedQuantity" validate-trigger="input">-->
<!--                  <a-input v-model="formData.issuedQuantity" placeholder="请输入已发行量" allow-clear></a-input>-->
<!--                </a-form-item>-->
<!--              </a-col>-->
              <!-- <a-col :span="8">
                <a-form-item label="最近发行时间" field="lastIssueTime" validate-trigger="input">
                  <a-date-picker v-model="formData.lastIssueTime" show-time placeholder="请选择" allow-clear></a-date-picker>
                </a-form-item>
              </a-col> -->
              <!-- <a-col :span="8">
                <a-form-item label="项目名称" field="projectName" validate-trigger="input">
                  <a-input v-model="formData.projectName" placeholder="请输入项目名称" allow-clear></a-input>
                </a-form-item>
              </a-col> -->





              <a-col :span="8">
                <a-form-item label="剩余次数(次数券)" field="remainingTimes" validate-trigger="input">
                  <a-input v-model="formData.remainingTimes" placeholder="请输入剩余次数" allow-clear></a-input>
                </a-form-item>
              </a-col>



              <!-- <a-col :span="8">
                <a-form-item label="在车场列表中显示" field="showInCarparkList" validate-trigger="input">
                  <a-select v-model="formData.showInCarparkList" placeholder="请选择" allow-clear>
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
              <!-- <a-col :span="8">
                <a-form-item label="副标题" field="subtitle" validate-trigger="input">
                  <a-input v-model="formData.subtitle" placeholder="请输入副标题" allow-clear></a-input>
                </a-form-item>
              </a-col> -->

              <!-- <a-col :span="8">
                <a-form-item label="门槛价格" field="thresholdPrice" validate-trigger="input">
                  <a-input v-model="formData.thresholdPrice" placeholder="请输入门槛价格" allow-clear></a-input>
                </a-form-item>
              </a-col> -->



              <a-col :span="8">
                <a-form-item label="次数券价格" field="timesCouponPrice" validate-trigger="input">
                  <a-input v-model="formData.timesCouponPrice" placeholder="请输入" allow-clear></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item label="次数券每日上限(0为不限制)" field="timesDailyLimit" validate-trigger="input">
                  <a-input v-model="formData.timesDailyLimit" placeholder="请输入次数每日限额" allow-clear></a-input>
                </a-form-item>
              </a-col>
<!--              <a-col :span="8">-->
<!--                <a-form-item label="总发行量" field="totalIssueQuantity" validate-trigger="input">-->
<!--                  <a-input v-model="formData.totalIssueQuantity" :max="9999999999" placeholder="请输入"-->
<!--                    style="width: 100%"></a-input>-->
<!--                </a-form-item>-->
<!--              </a-col>-->

              
              <!-- <a-col :span="8">
                <a-form-item label="单位时间" field="unitOfTime" validate-trigger="input">
                  <a-input v-model="formData.unitOfTime" placeholder="请输入单位时间" style="width: 100%"></a-input>
                </a-form-item>
              </a-col> -->

              <!-- <a-col :span="8">
                <a-form-item label="单位时间内发放梯度" field="unitOfTimeIssueGradient" validate-trigger="input">
                  <a-input v-model="formData.unitOfTimeIssueGradient" :max="9999999999" placeholder="请输入单位时间内发放梯度"
                    style="width: 100%"></a-input>
                </a-form-item>
              </a-col> -->

              <!-- <a-col :span="8">
                <a-form-item label="单位时间内总发行量" field="unitOfTimeTotalIssueQuantity" validate-trigger="input">
                  <a-input v-model="formData.unitOfTimeTotalIssueQuantity" :max="9999999999" placeholder="请输入单位时间内总发行量"
                    style="width: 100%"></a-input>
                </a-form-item>
              </a-col> -->

              <!-- <a-col :span="8">
                <a-form-item label="单位时间内已发放数量" field="unitOfTimeTotalIssuedQuantity" validate-trigger="input">
                  <a-input v-model="formData.unitOfTimeTotalIssuedQuantity" :max="9999999999" placeholder="请输入单位时间内已发放数量"
                    style="width: 100%"></a-input>
                </a-form-item>
              </a-col> -->

              <a-col :span="8">
                <a-form-item label="次数券有效期(小时)" field="timesTermValidity" validate-trigger="input">
                  <a-input v-model="formData.timesTermValidity" placeholder="请输入"></a-input>
                </a-form-item>
              </a-col>


              <a-col :span="8">
                <a-form-item label="次数券二维码重复使用" field="timesQrcodeMultiplex" validate-trigger="input">
                  <a-select v-model="formData.timesQrcodeMultiplex" placeholder="请选择" allow-clear>
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
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
import { addCouponActivity, updateCouponActivity } from '@/api/pay';
import { Message } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash';
import { parseTime } from '@/utils';

const visible = ref(false);
const loading = ref(false);
const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const formData = ref({
  activityStatus: '',
  amountDailyLimit: '',
  autoCleared: '',
  requireInService: '',
  autoGiveAway: '',
  autoGiveAwayDate: '',
  autoGiveAwayOverageQuota: '',
  autoGiveAwayQuota: '',
  autoGiveAwayTime: '',
  couponType: '',
  denomination: '',
  endTime: '',
  goodsId: '',
  image: '',
  introduction: '',
  issuedQuantity: '',
  lastIssueTime: '',
  phone: '',
  projectName: '',
  rechargeRatio: '',
  remainingQuantity: '',
  remainingTime: 0,
  remainingTimes: '',
  repeatTimes: '',
  shopkeeperName: '',
  showInCarparkList: '',
  startTime: '',
  subtitle: '',
  thresholdPrice: '',
  timeCouponPrice: '',
  timeDailyLimit: '',
  timesCouponPrice: '',
  timesDailyLimit: '',
  title: '',
  totalIssueQuantity: '',
  tradeType: '',
  type: '',
  unitOfTime: '',
  unitOfTimeIssueGradient: 0,
  unitOfTimeTotalIssueQuantity: 0,
  unitOfTimeTotalIssuedQuantity: 0,
  amountTermValidity: 0,
  timesTermValidity: 0,
  timeTermValidity: 0,
  amountQrcodeMultiplex: 0,
  timesQrcodeMultiplex: 0,
  timeQrcodeMultiplex: 0,
  id: '',
  ipsPhone: '',
});
// 用于处理返回的字段 为 '0' 的情况
const formatTime = (time: any) => {
  console.log(time, 'timeeeee');

  if (time === '0' || !time || time === '-') {
    return '';
  } else {
    return parseTime(time);
  }
};
const handleClick = (e: any = null) => {
  if (e?.id) {
    const newInfo = JSON.parse(JSON.stringify(e));
    newInfo.startTime = formatTime(e.startTime);
    newInfo.endTime = formatTime(e.endTime);
    // newInfo.autoGiveAwayDate = formatTime(e.autoGiveAwayDate);
    newInfo.autoGiveAwayTime = formatTime(e.autoGiveAwayTime);
    newInfo.lastIssueTime = formatTime(e.lastIssueTime);

    newInfo.amountTermValidity = e.amountTermValidity / 3600000;
    newInfo.timesTermValidity = e.timesTermValidity / 3600000;
    newInfo.timeTermValidity = e.timeTermValidity / 3600000;
    newInfo.remainingTime = (e.remainingTime / 3600000).toFixed(0);
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
    const newFormData = {
      ...cloneDeep(formData.value),
      startTime: new Date(formData.value.startTime).getTime(),
      endTime: new Date(formData.value.endTime).getTime(),
      // autoGiveAwayDate: new Date(formData.value.autoGiveAwayDate).getTime(),
      autoGiveAwayTime: new Date(formData.value.autoGiveAwayTime).getTime(),
      lastIssueTime: new Date(formData.value.lastIssueTime).getTime(),
      amountTermValidity: formData.value.amountTermValidity * 3600000,
      timesTermValidity: formData.value.timesTermValidity * 3600000,
      timeTermValidity: formData.value.timeTermValidity * 3600000,
      remainingTime: formData.value.remainingTime * 3600000,
    };
    // @ts-ignore
    if (formData.value.id) {
      const { code } = await updateCouponActivity(newFormData);
      if (code === 10002) {
        formRef.value.resetFields();
        visible.value = false;
        Message.success('更新成功!');
        emit('fetchData');
      }
    } else {
      const { code } = await addCouponActivity(newFormData);
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
