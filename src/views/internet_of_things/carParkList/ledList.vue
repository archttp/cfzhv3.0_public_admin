<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      draggable
      :footer="false"
      fullscreen
      @close="resetFields"
    >
      <template #title> {{ modalTitle }} - 显示屏 </template>
      <a-button
        type="primary"
        size="mini"
        style="margin-bottom: 8px"
        @click="showEdit"
        >新增</a-button
      >
      <a-popconfirm content="您确定恢复所有默认显示配置吗？" @ok="setDefaultDeviceScreenShow()">
        <a-button type="primary" status="danger" size="mini"
          >恢复(使用)默认配置</a-button
        >
      </a-popconfirm>
      <a-tabs trigger="click" @change="tabsChange">
        <a-tab-pane
          :title="item.label"
          v-for="item in businessTypeArr"
          :key="item.value"
        >
        </a-tab-pane>
      </a-tabs>
      <a-tabs trigger="click" @change="carTypeTabsChange">
        <a-tab-pane
          :title="item.name"
          v-for="item in carTypeList"
          :key="item.flagKey"
        >
        </a-tab-pane>
      </a-tabs>
      <!-- <a-button
            type="primary"
            @click="handleAdd"
            style="margin-bottom: 16px"
          >
            <template #icon>
              <icon-plus />
            </template>
            新建
          </a-button> -->
      <!-- <a-table
            row-key="id"
            :columns="columns"
            :data="list"
            :loading="loading"
          >
            <template #operations="{ record }">
              <a-space>
                <a-popconfirm
                  content="您确定删除吗？"
                  @ok="onDelete(record.id)"
                >
                  <a-button type="primary" status="danger" size="mini"
                    >删除</a-button
                  >
                </a-popconfirm>
                <a-button type="primary" size="mini" @click="handleEdit(record)"
                  >编辑</a-button
                >
              </a-space>
            </template>
          </a-table> -->
      <a-table
        row-key="id"
        :columns="columns"
        :data="list"
        :style="{ height: '700px' }"
        :loading="tableLoading"
      >
        <template #operations="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="showEdit(record)"
              >编辑</a-button
            >
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini"
                >删除</a-button
              >
            </a-popconfirm>
          </a-space>
        </template></a-table
      >
    </a-modal>
    <a-modal
      v-model:visible="editVisible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 速填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="内容类型"
                  field="variableValueType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.variableValueType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in variableValueTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="行号"
                  field="rowNo"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.rowNo"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="备用内容(兼容非万能语音卡)"
                  field="reserveContents"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.reserveContents"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="内容"
                  field="contents"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.contents"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 默认信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="区域id(例如停车场id/充电站id)"
                  field="areaId"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.areaId"
                    placeholder="请输入"
                    disabled
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="使用场景"
                  field="scenes"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.scenes"
                    placeholder="请选择"
                    allow-clear
                    disabled
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in scenesArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="资源类型"
                  field="sourceType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.sourceType"
                    placeholder="请选择"
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in sourceTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="字体" field="font" validate-trigger="input" required>
                  <a-select
                    v-model="formData.font"
                    placeholder="请选择"
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in fontArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="颜色"
                  field="color"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.color"
                    placeholder="请选择"
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in colorArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="开始时间"
                  field="startTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.startTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="结束时间"
                  field="endTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.endTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="显示方式"
                  field="font"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.displayMode"
                    placeholder="请选择"
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in displayModeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="业务类型"
                  field="businessType"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.businessType"
                    placeholder="请选择"
                    disabled
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in businessTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="停留时长(毫秒)"
                  field="font"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.keepTime"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="使用对象类型"
                  field="useObjectType"
                  validate-trigger="input"
                >
                  <a-select
                    v-model="formData.useObjectType"
                    placeholder="请选择"
                    allow-clear
                    disabled
                  >
                    <a-option
                      :value="item.flagKey"
                      v-for="item in carTypeList"
                      :key="item.flagKey"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="字体大小"
                  field="fontSize"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.fontSize"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="设置为模板"
                  field="template"
                  validate-trigger="input"
                >
                  <a-select placeholder="请选择" allow-clear v-model="formData.template">
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
            <!-- <a-button @click="resetFields"> 重置 </a-button> -->
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
  import { ledGet, ledDelete, ledUpdate, ledAdd } from '@/api/internetOfThings';
  import { getCarTypeListByQuery, setParkDefaultDeviceScreenShow } from '@/api/park';
  import { Message } from '@arco-design/web-vue';
  import { cloneDeep } from 'lodash';
  import { parseTime } from '@/utils';
  import dayjs from 'dayjs';

  const visible = ref(false);
  const editVisible = ref(false);
  const list = ref([]);
  const loading = ref(false);
  const tableLoading = ref(false);
  const modalTitle = ref('');
  const formRef = ref();
  const businessType = ref(0);
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const columns = [
    {
      title: '万能语音内容',
      dataIndex: 'contents',
      ellipsis: true,
      tooltip: true,
      width: 200,
    },
    {
      title: '非万能语音内容',
      dataIndex: 'reserveContents',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: '内容类型',
      dataIndex: 'newVariableValueType',
    },
    {
      title: '停留时长(毫秒)',
      dataIndex: 'keepTime',
    },
    {
      title: '业务类型',
      dataIndex: 'newBusinessType',
    },
    {
      title: '显示方式',
      dataIndex: 'newDisplayMode',
    },
    {
      title: '字体',
      dataIndex: 'newFont',
    },
    {
      title: '使用场景',
      dataIndex: 'newScenes',
    },
    {
      title: '颜色',
      dataIndex: 'newColor',
    },
    {
      title: '行号',
      dataIndex: 'rowNo',
    },
    {
      title: '字体大小',
      dataIndex: 'fontSize',
    },
    {
      title: '模板',
      dataIndex: 'newTemplate',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ];
  const generateFormModel = () => {
    return {
      areaId: '',
      businessType: '',
      color: 6,
      contents: '',
      displayMode: 10,
      endTime: 4852153373000,
      font: 1,
      keepTime: 0,
      scenes: 1,
      sourceType: 0,
      startTime: 1696479802000,
      useObjectType: '',
      variableValue: '',
      variableValueType: '',
      rowNo: '',
      fontSize: 1,
      reserveContents: '',
      id: '',
      template: 0,
    };
  };
  const businessTypeArr = [
    { value: 0, label: '正常入场' },
    { value: 1, label: '禁止入场' },
    { value: 2, label: '待确认入场' },
    { value: 3, label: '追缴入场' },
    { value: 4, label: '过期入场' },
    { value: 5, label: '正常出场' },
    { value: 6, label: '禁止出场' },
    { value: 7, label: '待确认出场' },
    { value: 8, label: '待缴费出场' },
    { value: 9, label: '缴费成功出场' },
    { value: 10, label: '异常出场' },
    { value: 11, label: '广告' },
    { value: 12, label: '缴费成功入场' },
  ];
  const variableValueTypeArr = [
    { value: 0, label: '对象编号' },
    { value: 1, label: '对象类型' },
    { value: 2, label: '时长' },
    { value: 3, label: '当前时间' },
    { value: 4, label: '时间' },
    { value: 5, label: '金额' },
    { value: 6, label: '原样输出' },
    { value: 7, label: '车位数' }
  ];
  const displayModeArr = [
    { value: 0, label: '立即显示' },
    { value: 1, label: '从右向左移动' },
    { value: 2, label: '从左向右移动' },
    { value: 3, label: '从下向上移动' },
    { value: 4, label: '从上向下移动' },
    { value: 5, label: '向下拉窗' },
    { value: 6, label: '向上拉窗' },
    { value: 7, label: '向左拉窗' },
    { value: 8, label: '向右拉窗' },
    { value: 9, label: '逐字显示' },
    { value: 10, label: '连续左移' },
    { value: 11, label: '连续右移' },
  ];
  const fontArr = [
    { value: 0, label: 'ASCII8' },
    { value: 1, label: 'ASCII10' },
    { value: 2, label: 'ASCII13' },
    { value: 3, label: '宋体16' },
    { value: 4, label: '宋体24' },
    { value: 5, label: '宋体32' },
    { value: 6, label: '宋体48' },
    { value: 7, label: '宋体64' },
  ];
  const scenesArr = [
    { value: 0, label: '人脸门禁' },
    { value: 1, label: '停车场' },
    { value: 2, label: '商城' },
    { value: 3, label: '充电' },
    { value: 4, label: '洗车' },
    { value: 5, label: '加油' },
  ];
  const sourceTypeArr = [
    { value: 0, label: '普通文字' },
    { value: 1, label: '普通图片地址' },
    { value: 2, label: '普通图片字符' },
    { value: 3, label: '视频地址' },
    { value: 4, label: '视频字符' },
    { value: 5, label: '二维码' },
    { value: 6, label: '时间' },
  ];
  const colorArr = [
    { value: 1, label: '蓝色' },
    { value: 2, label: '黄色' },
    { value: 3, label: '白色' },
    { value: 4, label: '黑色' },
    { value: 5, label: '绿色' },
    { value: 6, label: '红色' },
    { value: 7, label: '青色' },
    { value: 8, label: '紫色' },
    { value: 9, label: '橙色' },
  ];
  const carType = ref('');
  const carTypeList = ref([]);
  const formData = ref(generateFormModel());

  // 用于处理返回的字段 为 '0' 的情况
  const formatTime = (time: any) => {
    console.log(time, 'timeeeee');

    if (time === '0' || !time || time === '-') {
      return '';
    } else {
      return parseTime(time);
    }
  };
  const showEdit = (row: any) => {
    if (row.id) {
      formData.value = row;
    } else {
      formData.value = {
        ...generateFormModel(),
        areaId: formData.value.areaId,
        // @ts-ignore
        businessType: businessType.value,
        useObjectType: carType.value,
      };
    }
    editVisible.value = true;
  };
  const tabsChange = (e: any) => {
    businessType.value = e;
    getList();
  };
  const carTypeTabsChange = (e: any) => {
    carType.value = e;
    getList();
  };

  const onDelete = async (id: string) => {
    await ledDelete({ params: { id: id } });
    getList();
  };
  const handleClick = (e: any = null, title: any) => {
    console.log(e);
    formData.value.areaId = e;
    visible.value = true;
    modalTitle.value = title;
    // getList();
    getCarTypeList();
  };
  const getCarTypeList = async () => {
    const { data, code, total } = await getCarTypeListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code == 10002) {
      carTypeList.value = data;
      carType.value = data[0].flagKey;
      getList();
    } else {
      carTypeList.value = [];
    }
  };
  const getVariableValueTypeLabel = (value: any) => {
    const result = variableValueTypeArr.find((item) => item.value === value);
    return result ? result.label : '';
  };
  const getColorLabel = (value: any) => {
    const result = colorArr.find((item) => item.value === value);
    return result ? result.label : '';
  };
  const getList = async () => {
    tableLoading.value = true;
    const { data, code, total } = await ledGet({
      params: {
        areaId: formData.value.areaId,
        page: 1,
        size: 200,
        businessType: businessType.value,
        useObjectType: carType.value,
      },
    });
    tableLoading.value = false;
    if (code == 10002) {
      for (const i of data) {
        i.newBusinessType = businessTypeArr[i.businessType].label;
        i.newDisplayMode = displayModeArr[i.displayMode].label;
        i.newFont = fontArr[i.font].label;
        i.newScenes = scenesArr[i.scenes].label;
        i.newVariableValueType = getVariableValueTypeLabel(i.variableValueType);
        i.newColor = getColorLabel(i.color);
        i.startTime = formatTime(i.startTime);
        i.endTime = formatTime(i.endTime);
        i.newTemplate = i.template ? '是' : '否';
      }
      list.value = data;
    } else {
      list.value = [];
    }
  };
  const setDefaultDeviceScreenShow = async () => {
    const { data, code, total } = await setParkDefaultDeviceScreenShow({
      params: {
        id: formData.value.areaId,
      },
    });
    if (code == 10002) {
      getList();
    } else {
    }
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      const newForm = cloneDeep(formData.value);
      // @ts-ignore
      newForm.startTime = dayjs(formData.value.startTime).valueOf();
      // @ts-ignore
      newForm.endTime = dayjs(formData.value.endTime).valueOf();
      if (formData.value.id) {
        const { code } = await ledUpdate(newForm);
        if (code === 10002) {
          resetFields();
          editVisible.value = false;
          Message.success('更新成功!');
          getList();
        }
      } else {
        const { code } = await ledAdd(newForm);
        if (code === 10002) {
          resetFields();
          editVisible.value = false;
          Message.success('添加成功!');
          getList();
        }
      }
    });
  };
  const resetFields = () => {
    formData.value = {
      ...generateFormModel(),
      areaId: formData.value.areaId,
    };
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
