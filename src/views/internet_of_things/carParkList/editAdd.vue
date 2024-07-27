<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      fullscreen
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        {{ formData?.id ? '编辑停车场' : '新增停车场' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
              <a-tabs>
                <a-tab-pane key="1">
                  <template #title>
                    <icon-calendar/> 基本信息
                  </template>
                  <a-row :gutter="80">
                    <a-col :span="8">
                      <a-form-item
                        label="停车场名字"
                        field="name"
                        validate-trigger="input"
                        required
                        tooltip="请规范填写，方便车主快速准确搜索到您停车场"
                      >
                        <a-input
                          v-model="formData.name"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    
                    <a-col :span="8">
                      <a-form-item
                        label="车位数"
                        field="parkingSpaceNumber"
                        validate-trigger="input"
                        required
                        tooltip="本车场做多可以停多少辆车"
                      >
                        <a-input
                          v-model="formData.parkingSpaceNumber"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="已用车位数"
                        field="usedParkingSpaceNumber"
                        validate-trigger="input"
                        required
                        tooltip="本车场已经使用了多少个车位，当系统统计数量不准确时，可以在此修改"
                      >
                        <a-input
                          v-model="formData.usedParkingSpaceNumber"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="停车场负责人手机号"
                        field="phone"
                        validate-trigger="input"
                        required
                        tooltip="请填写11位手机号，方便发生紧急情况时，联系到对应的负责人"
                      >
                        <a-input
                          v-model="formData.phone"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="座机" field="landline">
                        <a-input
                          v-model="formData.landline"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="评分" field="score" tooltip="默认值10，当用户享受服务后可以评价">
                        <a-input
                          v-model="formData.score"
                          placeholder="请输入"
                          allow-clear
                          :disabled="true"
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="状态" field="status">
                        <a-select
                          v-model="formData.status"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">正常</a-option>
                          <a-option :value="1">车位已满</a-option>
                          <a-option :value="2">暂停营业</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="国家id" field="countryId">
                        <a-input
                          v-model="formData.countryId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="省份id" field="provinceId">
                        <a-input
                          v-model="formData.provinceId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="州或城市id" field="stateOrCityId">
                        <a-input
                          v-model="formData.stateOrCityId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="乡镇id" field="townshipId">
                        <a-input
                          v-model="formData.townshipId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="区或县id" field="zoneOrCountyId">
                        <a-input
                          v-model="formData.zoneOrCountyId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-alert style="margin-bottom: 16px; width: 80%;">
                      提示： 点击右侧按钮可快速查找经纬度
                      <template #action>
                        <a-button size="small" type="primary" @click="showMapView"
                          >点我</a-button
                        >
                      </template>
                    </a-alert>
                    <a-col :span="8">
                      <a-form-item
                        label="停车场地址"
                        field="address"
                        validate-trigger="input"
                        required
                        tooltip="可以在小程序和APP端展示您停车场的具体位置"
                      >
                        <a-input
                          v-model="formData.address"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="经度"
                        field="positionX"
                        validate-trigger="input"
                        required
                      >
                        <a-input
                          v-model="formData.positionX"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="纬度"
                        field="positionY"
                        validate-trigger="input"
                        required
                      >
                        <a-input
                          v-model="formData.positionY"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-tab-pane>
                <a-tab-pane key="2">
                  <template #title>
                    <icon-clock-circle/> 参数配置
                  </template>
                  <a-row :gutter="80">
                    <a-col :span="8">
                      <a-form-item
                        label="计费模式"
                        field="billingModel"
                        validate-trigger="input"
                        required
                        tooltip="【①-动态时间计费】：按实时当前时间点计费，例如07：00-12：00 按5元/小时。----------------
                        【②-固定时长计费】：按时长计费，不管当前时间是几点，例如 前面 2小时按 3元/小时，超过2个小时后按5元/小时 收。-----------------------------
                        【③-动态时间按时长计费】：按实时当前时间点计费，但是会根据当前时间匹配的收费规则 按 时长收费，
                        例如 07：00-12：00 前面 2小时按 3元/小时，超过2个小时后按5元/小时 收，12：00-19：00 前面 4小时按 6元/小时，超过4个小时后按3元/小时 收"
                      >
                        <a-select
                          v-model="formData.billingModel"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option value="dynamic_time">动态时间计费</a-option>
                          <a-option value="fixed_time">固定时长计费</a-option>
                          <a-option value="dynamic_fixed_time">动态时间按段时长计费</a-option>
                          <a-option value="dynamic_time_upper_limit">每天指定最高费用</a-option>
                          <a-option value="static_time_upper_limit">限时指定最高费用</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="单次停车费用封顶(仅仅对外显示，不起任何作用)"
                        field="feeUpperLimit"
                        validate-trigger="input"
                        required
                        tooltip="方便车主在小程序/APP/公众号 等 直接大概了解本停车场每次停车最高封顶，这不起任何作用，只是做展示用"
                      >
                        <a-input
                          v-model="formData.feeUpperLimit"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="免费时长(分钟)(仅仅对外显示，不起任何作用)"
                        field="freeTime"
                        validate-trigger="input"
                        required
                        tooltip="方便车主在小程序/APP/公众号 等 直接大概了解本停车场每次停车最高-免停时间，参考这个停车超过这个时长后可能需要缴费停车费，这不起任何作用，只是做展示用"
                      >
                        <a-input
                          v-model="formData.freeTime"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="离场时间限制(分钟)(仅仅对外显示，不起任何作用)"
                        field="leaveTimeLimit"
                        validate-trigger="input"
                        required
                        tooltip="方便车主在小程序/APP/公众号 等 直接大概了解本停车场 场内提前缴费后，参考这个停车超过这个时长后可能需要“再次”缴费停车费，这不起任何作用，只是做展示用"
                      >
                        <a-input
                          v-model="formData.leaveTimeLimit"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    
                    <a-col :span="8">
                      <a-form-item
                        label="单位时长(分钟)"
                        field="unitDuration"
                        validate-trigger="input"
                        required
                        tooltip="以多少分钟未一个收费梯度，例如你填了60就按每个小时收费，你填了30表示按每小时进行收费，其它以此类推"
                      >
                        <a-input
                          v-model="formData.unitDuration"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item 
                        label="充电站id" 
                        field="chargingStationId"
                        tooltip="如果您车场内有充电站，填上对应的充电站，方便车主直接停车时知晓并了解充电相关服务，且可以直接使用充电服务"
                      >
                        <a-input
                          v-model="formData.chargingStationId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                       label="代收停车场id" 
                       field="collectionCarparkId"
                       tooltip="例如地库的停车费 需要到 地面 岗亭来收， 此地库停车场需要填 地面停车场编号id"
                      >
                        <a-input
                          v-model="formData.collectionCarparkId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                       label="当前价格(仅仅对外显示，不起任何作用)" 
                       field="currentPrice"
                       tooltip="方便车主在小程序/APP/公众号 等 直接大概了解本停车场 停车费用价格，这不起任何作用，只是做展示用"
                      >
                        <a-input
                          v-model="formData.currentPrice"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                       label="特殊车牌号" 
                       field="specialNumberPlate"
                       tooltip="请输入正则表达式，不懂正则表达式的请留空，凡是命中的规则，都会免费放行，主要时供给--警车/消防车/法院/大使馆等公务车使用，不会配置的请联系专业人员配置"
                       >
                        <a-input
                          v-model="formData.specialNumberPlate"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                       label="仓库物流id" 
                       field="storehouseId"
                       tooltip="有物流港的系统可以填写，否则留空"
                       >
                        <a-input
                          v-model="formData.storehouseId"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="预约费用(预付)" field="subscribeFee">
                        <a-input
                          v-model="formData.subscribeFee"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="预约后多少时间免责取消(分钟)"
                        field="subscribeFreeTime"
                      >
                        <a-input
                          v-model="formData.subscribeFreeTime"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="预约后超时但未使用扣费比例(百分比)"
                        field="subscribeTimeoutFee"
                      >
                        <a-input
                          v-model="formData.subscribeTimeoutFee"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="滞留车辆界定时间(天)"
                        field="strandedVehiclesDefinedTime"
                      >
                        <a-input
                          v-model="formData.strandedVehiclesDefinedTime"
                          placeholder="请输入(天数)"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="车辆预约到访审核模式"
                        field="visitProcessMode"
                      >
                        <a-select
                          v-model="formData.visitProcessMode"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">关闭</a-option>
                          <a-option :value="1">业主审核</a-option>
                          <a-option :value="2">物业审核</a-option>
                          <a-option :value="3">双重审核</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item field="etcApplicationId" label="ETC应用">
                        <a-select
                          :loading="loading"
                          placeholder="请输入"
                          allow-search
                          allow-clear
                          @search="etcApplicationSearch"
                          :filter-option="false"
                          v-model="formData.etcApplicationId"
                        >
                          <a-option v-for="item of etcApplicationList" :value="item.id">{{
                            item.applicationName
                          }}</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                          label="etc停车场id"
                          field="etcParkId"
                      >
                        <a-input
                            v-model="formData.etcParkId"
                            placeholder="请从ETC平台获取"
                            allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="图片" field="image">
                        <a-upload
                          list-type="picture-card"
                          :action="apiHost+'/file/cfFile/upload'"
                          :file-list="fileList"
                          :data="uploadData"
                          image-preview
                          :headers="header"
                          @success="onSuccess"
                          @change="onChange"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-tab-pane>
                <a-tab-pane key="3">
                  <template #title>
                    <icon-user/> 控制配置
                  </template>
                  <a-row :gutter="80">
                    <a-col :span="8">
                      <a-form-item label="是否开启追缴" field="recovery">
                        <a-select
                          v-model="formData.recovery"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="重复入场校验时长(分钟)"
                        field="checkRepeatTime"
                      >
                        <a-input
                          v-model="formData.checkRepeatTime"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="预约到访有效时间(小时)"
                        field="scheduledVisitsEffectiveTime"
                      >
                        <a-input
                          v-model="formData.scheduledVisitsEffectiveTime"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="允许提前预约时间"
                        field="advanceSubscribeTime"
                      >
                        <a-input
                          v-model="formData.advanceSubscribeTime"
                          placeholder="请输入"
                          allow-clear
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="是否允许值班人修改停车记录"
                        field="allowEditUseLog"
                      >
                        <a-select
                          v-model="formData.allowEditUseLog"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="是否自动下发白名单"
                        field="autoIssuedWhitelist"
                      >
                        <a-select
                          v-model="formData.autoIssuedWhitelist"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="是否禁止家庭组同时入内"
                        field="forbidGroupFlagSameTimeIn"
                      >
                        <a-select
                          v-model="formData.forbidGroupFlagSameTimeIn"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="是否通知车辆套餐到期"
                        field="packageExpirationNotice"
                      >
                        <a-select
                          v-model="formData.packageExpirationNotice"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="车位满时限制"
                        field="limitParkingSpaceNumber"
                      >
                        <a-select
                          v-model="formData.limitParkingSpaceNumber"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="车牌号颜色判定车辆类型"
                        field="numberPlateColorToCarType"
                      >
                        <a-select
                          v-model="formData.numberPlateColorToCarType"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="家庭组免停期自动切换"
                        field="packageGroupFlagAutoChange"
                      >
                        <a-select
                          v-model="formData.packageGroupFlagAutoChange"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="是否显示已过期套餐车类型"
                        field="showExpiredCarType"
                      >
                        <a-select
                          v-model="formData.showExpiredCarType"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item label="是否显示停车记录备注" field="showRemarks">
                        <a-select
                          v-model="formData.showRemarks"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="是否开启储值卡"
                        field="enableStoredCard"
                      >
                        <a-select
                          v-model="formData.enableStoredCard"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="开启ETC"
                        field="useEtc"
                      >
                        <a-select
                          v-model="formData.useEtc"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">关闭</a-option>
                          <a-option :value="1">开启</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="特种车辆识别"
                        field="recognitionSpecialVehicles"
                      >
                        <a-select
                          v-model="formData.recognitionSpecialVehicles"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">关闭</a-option>
                          <a-option :value="1">开启</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="数据上报政府部门"
                        field="reportedData"
                      >
                        <a-select
                          v-model="formData.reportedData"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">否</a-option>
                          <a-option :value="1">是</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        label="收费单位"
                        field="feeUnit"
                      >
                        <a-select
                          v-model="formData.feeUnit"
                          placeholder="请选择"
                          allow-clear
                        >
                          <a-option :value="0">小时</a-option>
                          <a-option :value="1">次</a-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-tab-pane>
              </a-tabs>
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
    <a-modal
      v-model:visible="mapVisible"
      :footer="false"
      width="1200px"
      @open="mapModalOpen"
    >
      <a-form :model="mapForm">
        <a-row :gutter="16" align="center">
          <a-col :span="10">
            <a-form-item label="地点搜索" field="carParkId" style="margin-top: 16px;">
              <a-select
                placeholder="请输入"
                allow-search
                allow-clear
                @search="handleSelectSearch"
                @change="handleSelectChange"
                :filter-option="false"
                :loading="selectLoading"
                v-model="mapForm.address"
              >
                <a-option
                  v-for="item of addRessArr"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.title + ' - ' + item.address }}</a-option
                >
              </a-select>
              <!-- <a-input-number v-model="formData.carParkId" allow-clear /> -->
            </a-form-item>
          </a-col>
          <a-col :span="3">经度：{{ mapForm.x || '-' }}</a-col>
          <a-col :span="3">纬度：{{ mapForm.y || '-' }}</a-col>
          <!-- <a-col :span="5">
            <a-form-item field="x" label="经度">
              <a-input v-model="mapForm.x" placeholder="please enter..." />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item field="y" label="纬度" label-col-flex="80px">
              <a-input v-model="mapForm.y" placeholder="please enter..." />
            </a-form-item>
          </a-col> -->
          <a-col :span="3" :offset="1">
            <a-button type="primary" size="large" @click="onMapOk">确认</a-button>
          </a-col>
        </a-row>
      </a-form>
      <div id="mapBox" class="mapbox"> </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { cfCarParkAdd, cfCarParkUpdate } from '@/api/internetOfThings';
  import { cfDeveloperGet } from '@/api/user';
  import { Message } from '@arco-design/web-vue';
  import { getToken } from '@/utils/auth';
  import { cloneDeep } from 'lodash';
  import { jsonp } from '@/utils/jsonp';
  const qqmapKey = import.meta.env.VITE_TC_MAP_KEY;
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  var maps: any = null;
  var marker: any = null;

  const visible = ref(false);
  const mapVisible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const fileList = ref([]);
  const uploadFileList = ref([]);
  const etcApplicationList = ref([]);
  const header: any = ref({
    Authorization: getToken(),
  });
  const uploadData: any = ref({
    fileType: 1,
    scene: 'carpark',
  });
  const formData = ref({
    address: '',
    advanceSubscribeTime: '',
    allowEditUseLog: 0,
    autoIssuedWhitelist: 0,
    billingModel: '',
    chargingStationId: '',
    collectionCarparkId: '',
    countryId: '',
    currentPrice: '',
    expiredCarFreeTime: '',
    feeUpperLimit: '',
    forbidGroupFlagSameTimeIn: 0,
    freeTime: 30,
    image: '',
    landline: '',
    leaveTimeLimit: 15,
    limitParkingSpaceNumber: 0,
    name: '',
    numberPlateColorToCarType: 0,
    packageGroupFlagAutoChange: 0,
    parkingSpaceNumber: '',
    phone: '',
    positionX: '',
    positionY: '',
    provinceId: '',
    score: '',
    showExpiredCarType: 0,
    showRemarks: 0,
    specialFeeExpiredCar: '',
    specialNumberPlate: '',
    startingPrice: '',
    stateOrCityId: '',
    status: 0,
    storehouseId: '',
    subscribeFee: '',
    subscribeFreeTime: '',
    subscribeTimeoutFee: '',
    townshipId: '',
    unitDuration: 60,
    usedParkingSpaceNumber: '',
    visitProcessMode: 0,
    zoneOrCountyId: '',
    recovery: 0,
    checkRepeatTime: 5,
    scheduledVisitsEffectiveTime: 24,
    packageExpirationNotice: 0,
    strandedVehiclesDefinedTime: 30,
    id: '',
    enableStoredCard: 0,
    reportedData: 0,
    feeUnit: 0,
    useEtc: 0,
    recognitionSpecialVehicles: 0,
    etcApplicationId: '0',
    etcParkId: '',
  });

  // 地图相关方法及数据
  const selectLoading = ref(false);
  const mapForm = ref({
    x: '',
    y: '',
    address: '',
  });
  const addRessArr = ref([]);
  const handleSelectSearch = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      let url = `https://apis.map.qq.com/ws/place/v1/suggestion?keyword=${value}&key=${qqmapKey}&output=jsonp`;
      const res = await jsonp({ url });
      console.log(res);
      selectLoading.value = false;
      if (res.data.length > 0) {
        addRessArr.value = res.data;
      } else {
        addRessArr.value = [];
      }
    }
  };
  const handleSelectChange = (e: any) => {
    if (e) {
      const findRes = addRessArr.value.find((i) => i.id === e);
      maps.setCenter(
        // @ts-ignore
        new TMap.LatLng(findRes.location.lat, findRes.location.lng)
      );
      // @ts-ignore
      showMarKer(findRes.location.lat, findRes.location.lng, findRes.address);
    }
  };
  const etcApplicationSearch = async (_applicationName: any) => {
    const { data, code } = await cfDeveloperGet({
      params: {
        page: 1,
        size: 200,
        applicationName: _applicationName,
        platform: 'sdgs_etc',
      },
    });
    if (code == 10002) {
      etcApplicationList.value = data;
    } else {
      etcApplicationList.value = [];
    }
  };
  const onMapOk = () => {
    formData.value.positionX = mapForm.value.x;
    formData.value.positionY = mapForm.value.y;
    formData.value.address = mapForm.value.address;
    mapVisible.value = false;
  };
  const showMapView = () => {
    mapVisible.value = true;
  };
  const mapModalOpen = () => {
    if (maps === null) {
      initMap();
    }
  };
  const initMap = () => {
    var center = new window.TMap.LatLng(39.98412, 116.307484);
    //初始化地图
    maps = new window.TMap.Map(document.getElementById('mapBox'), {
      center: center, //设置地图中心点坐标
      zoom: 12, //设置地图缩放级别
      mapStyleId: 'style2', //设置地图样式
    });

    //初始化marker图层
    marker = new TMap.MultiMarker({
      id: 'marker-layer',
      map: maps,
    });

    maps.on('click', function (evt: any) {
      var lat = evt.latLng.getLat().toFixed(6);
      var lng = evt.latLng.getLng().toFixed(6);
      var address = evt.poi ? evt.poi.name : '';
      showMarKer(lat, lng, address);
    });
  };

  const showMarKer = (lat: any, lng: any, address: any) => {
    if (marker) {
      marker.setMap(null);
    }
    //初始化marker图层
    marker = new TMap.MultiMarker({
      id: 'marker-layer',
      map: maps,
    });

    marker.add({
      position: new TMap.LatLng(lat, lng),
    });
    mapForm.value.y = parseFloat(lat).toFixed(6).padStart(5, '0');
    mapForm.value.x = parseFloat(lng).toFixed(6).padStart(5, '0');
    mapForm.value.address = address;
  };

  
  onMounted(() => {
    etcApplicationSearch(null);
  });
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      newInfo.expiredCarFreeTime = e.expiredCarFreeTime / 60000;
      newInfo.checkRepeatTime = e.checkRepeatTime / 60000;
      newInfo.scheduledVisitsEffectiveTime = e.scheduledVisitsEffectiveTime / 3600000;
      newInfo.freeTime = e.freeTime / 60000;
      newInfo.unitDuration = e.unitDuration / 60000;
      newInfo.leaveTimeLimit = e.leaveTimeLimit / 60000;
      newInfo.subscribeFreeTime = e.subscribeFreeTime / 60000;
      newInfo.strandedVehiclesDefinedTime =
        e.strandedVehiclesDefinedTime / 86400000;

      formData.value = newInfo;
    }
    visible.value = true;
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
    uploadFileList.value = [];
    fileList.value = [];
  };
  const onChange = (_: any, currentFile: any) => {
    console.log(currentFile, _);
    uploadFileList.value = _;
  };
  const onSuccess = (fileRes: any) => {
    // @ts-ignore
    // uploadFileList.value = [...uploadFileList.value, fileRes.response.data.id];
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      const newForm = cloneDeep(formData.value);

      if (uploadFileList.value.length > 0) {
        newForm.image = uploadFileList.value
          .map((i) => i.response.data.id)
          .join(',');
      }
      newForm.expiredCarFreeTime = String(newForm.expiredCarFreeTime * 60000);
      newForm.checkRepeatTime = String(newForm.checkRepeatTime * 60000);
      newForm.scheduledVisitsEffectiveTime = String(newForm.scheduledVisitsEffectiveTime * 3600000);
      newForm.freeTime = String(newForm.freeTime * 60000);
      newForm.unitDuration = String(newForm.unitDuration * 60000);
      newForm.leaveTimeLimit = String(newForm.leaveTimeLimit * 60000);
      newForm.subscribeFreeTime = String(newForm.subscribeFreeTime * 60000);
      newForm.strandedVehiclesDefinedTime = String(
        newForm.strandedVehiclesDefinedTime * 86400000
      );

      // formData.freeTime = e.freeTime / 3600000;
      // formData.unitDuration = e.unitDuration / 3600000;
      // formData.leaveTimeLimit = e.leaveTimeLimit / 3600000;
      // formData.subscribeFreeTime = e.subscribeFreeTime / 3600000;
      // @ts-ignore
      if (newForm.id) {
        const { code } = await cfCarParkUpdate(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfCarParkAdd(newForm);
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
  .mapbox {
    width: 100%;
    height: 800px;
    margin-top: 12px;
  }
</style>
