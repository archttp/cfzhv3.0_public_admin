<template>
  <div class="container">
    <Breadcrumb :items="[
      'menu.pay.internetofthings',
      'menu.pay.internetofthings.carpark',
      'menu.pay.internetofthings.package',
    ]" />
    <a-card class="general-card" :title="$t('menu.pay.internetofthings.package')">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-tabs>
              <a-tab-pane key="1">
                <template #title>
                  <icon-calendar/> 输入搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="6">
                    <a-form-item field="carParkId" label="停车场">
                      <a-select :loading="loading" placeholder="请输入" allow-search allow-clear @search="handleSelectSearch"
                        :filter-option="false" v-model="formModel.carParkId">
                        <a-option v-for="item of parkList" :value="item.id">{{
                          item.name
                        }}</a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item field="numberPlate" label="车牌号">
                      <a-input v-model="formModel.numberPlate" placeholder="请输入" allow-clear />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item field="carOwnerName" label="车主姓名">
                      <a-input v-model="formModel.carOwnerName" placeholder="请输入" allow-clear />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item field="roomNo" label="房间号">
                      <a-input v-model="formModel.roomNo" placeholder="请输入" allow-clear />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item field="groupFlag" label="家庭组">
                      <a-input v-model="formModel.groupFlag" placeholder="一(多)位多车" allow-clear />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
              <a-tab-pane key="2">
                <template #title>
                  <icon-clock-circle/> 时间日期搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item label="开始时间" field="startTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onStartTimeChange"
                        @select="onStartTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="到期时间" field="endTime">
                      <a-range-picker
                        showTime
                        :time-picker-props="{
                        defaultValue:['00:00:00','00:00:00']
                        }"
                        @change="onEndTimeChange"
                        @select="onEndTimeSelect"
                        style=" width: 380px; "
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="快筛到期" field="status">
                      <a-select
                        v-model="formModel.expiringSoon"
                        placeholder="请选择"
                        allow-clear
                        @change="onExpiringSoonChange"
                      >
                        <a-option :value="0">已过期</a-option>
                        <a-option :value="1">7天内到期</a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
              <a-tab-pane key="3">
                <template #title>
                  <icon-user/> 选择搜索
                </template>
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item label="状态" field="status">
                      <a-select
                        v-model="formModel.status"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option :value="0">禁用</a-option>
                        <a-option :value="1">正常</a-option>
                        <a-option :value="2">停用</a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item label="车辆类型" field="typeKey">
                      <a-select
                        v-model="formModel.typeKey"
                        placeholder="请选择"
                        allow-clear
                      >
                        <a-option
                          :value="item.flagKey"
                          v-for="item in carTypeList"
                          :key="item.id"
                          >{{ item.name }}</a-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
          </a-form>
        </a-col>
        <a-divider style="height: 40px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <!-- <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button> -->
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-button type="primary" status="danger" @click="onBatchDelete">删除</a-button>
            <a-button type="primary" @click="handleAddHomeGroupPackage">
              <template #icon>
                <icon-plus />
              </template>
              速增家庭组车辆
            </a-button>
            <!-- <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload> -->
            <a-button @click="showPackageImport">
              {{ $t('searchTable.operation.import') }}
            </a-button>
            <a-button type="dashed" status="success" @click="showPackageBuyImport">批量续费</a-button>
            <a-button type="primary" status="danger" @click="showPackageActionLog">
              <template #icon>
                <icon-history />
              </template>
              操作日志
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-button @click="downloadCarParkPackage">
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id" 
        :columns="columns" 
        :data="state.list" 
        :style="{ height: '700px' }" 
        :pagination="pagination"
        :loading="loading" 
        @page-change="pageChange"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
       >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <!-- <template #operations="{ record }">
          <a-space>
            <a-popconfirm content="您确定删除吗？" @ok="onDelete(record.id)">
              <a-button type="primary" status="danger" size="mini">删除</a-button>
            </a-popconfirm>
            <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>
          </a-space>
        </template> -->
        <template #operations="{ record }">
          <a-dropdown trigger="click" :popup-max-height="false">
            <a-link>更多</a-link>
            <template #content>
              <a-doption>
                <a-space>
                  <a-button type="primary" size="mini" @click="handleEdit(record)">编辑数据</a-button>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space>
                  <a-button type="primary" status="danger" size="mini" @click="showPackageActionLogById(record)">历史追踪</a-button>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </a-card>
    <editAdd ref="editAddRef" @fetch-data="fetchData" />
    <addHomeGroupPackage ref="addHomeGroupPackageRef" @fetch-data="fetchData" />
    <packageImport ref="packageImportRef" />
    <packageBuyImport ref="packageBuyRef" @fetch-data="fetchData" />
    <packageActionLog ref="packageActionLogRef" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { packageListGet, packageListDelete, cfCarParkSearch, exportCarParkPackageExcel } from '@/api/internetOfThings';
import { getCarTypeListByQuery } from '@/api/park';
import editAdd from './editAdd.vue';
import addHomeGroupPackage from './addHomeGroupPackage.vue';
import packageImport from './packageImport.vue';
import packageBuyImport from './packageBuyImport.vue';
import { parseTime } from '@/utils/index';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import packageActionLog from './packageActionLog.vue';

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const loading = ref(false);
const selectLoading = ref(false);
const selectedKeys = ref([]);
const editAddRef = ref();
const addHomeGroupPackageRef = ref();
const packageImportRef = ref();
const packageBuyRef = ref();
const packageActionLogRef = ref();
const columns = [
  {
    width: 140,
    title: '停车场',
    dataIndex: 'carParkName',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 108,
    title: '车牌号',
    dataIndex: 'numberPlate',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 170,
    title: '开始时间',
    dataIndex: 'newStartTime',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 170,
    title: '结束时间',
    dataIndex: 'newEndTime',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    title: '车辆类型',
    dataIndex: 'newTypeKey',
  },
  {
    width: 130,
    title: '手机号',
    dataIndex: 'phone',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 60,
    title: '状态',
    dataIndex: 'newStatus',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 100,
    title: '备注',
    dataIndex: 'remarks',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 60,
    title: '内定',
    dataIndex: 'newSpecialGive',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 60,
    title: '跨区',
    dataIndex: 'newTransRegional',
    ellipsis: true,
    tooltip: {
      'background-color': '#3491FA',
    },
  },
  {
    width: 80,
    title: '白名单',
    dataIndex: 'newIssuedWhitelist',
  },
  {
    title: '分组',
    dataIndex: 'groupFlag',
  },
  {
    title: '车主姓名',
    dataIndex: 'carOwnerName',
  },
  {
    title: '房间号',
    dataIndex: 'roomNo',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
];
const showPackageActionLog = () => {
  packageActionLogRef.value.handleClick();
};
const showPackageActionLogById = (row: any) => {
  packageActionLogRef.value.handleClick({packageId: row.id});
};
const onBatchDelete = async () => {
  if(selectedKeys.value.length==0){
    return;
  }
  await packageListDelete({ params: { ids: selectedKeys.value.join(',') } });
  selectedKeys.value = [];
  fetchData();
};
const state = reactive({
  list: [],
});
const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    fixed: true,
    onlyCurrent: true,
  });
const generateFormModel = () => {
  return {
    carParkId: '',
    numberPlate: '',
    carOwnerName: '',
    minStartTime: '',
    maxStartTime: '',
    minEndTime: '',
    maxEndTime: '',
    expiringSoon: '',
    groupFlag: '',
    status: '',
    roomNo: '',
    typeKey: '',
  };
};
const formModel = ref(generateFormModel());
const carTypeList = ref([]);
const parkList = ref([]);
onMounted(() => {
  getCarType();
  fetchData();
  handleSelectSearch(null);
});

const onExpiringSoonChange = (value: any) => {
  formModel.value.expiringSoon = value;
  if(formModel.value.expiringSoon=='0'){
    //搜索已经过期的
    formModel.value.minEndTime = '';
    formModel.value.maxEndTime = dayjs().valueOf() + '';
  }else if(formModel.value.expiringSoon=='1'){
    //搜索7天内过期的
    formModel.value.minEndTime = dayjs().valueOf() + '';
    formModel.value.maxEndTime = (dayjs().add(1, 'week').valueOf()) + '';
  }else{
    formModel.value.minEndTime = '';
    formModel.value.maxEndTime = '';
  }
}

//下载停车套餐
const downloadCarParkPackage = async () => {
    let newForm = cloneDeep(formModel.value);
    await exportCarParkPackageExcel({
      params: checkParams({
        ...newForm,
      }),
      responseType: 'blob',
    })
    .then((data) => {
      const link = document.createElement('a')
      let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)

      // link.download = res.headers['content-disposition'] //下载后文件名
      link.download = '停车套餐' //下载的文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((error) => {
      console.log(error)
    })
  };

const onStartTimeSelect = (dateString: any, date: any) => {
  //不做任何操作
};
const onStartTimeChange = (dateString: any, date: Date[]) => {
  if(date!=undefined){
    formModel.value.minStartTime = dayjs(date[0]).valueOf() + '';
    formModel.value.maxStartTime = dayjs(date[1]).valueOf() + '';
  }else{
    formModel.value.minStartTime = '';
    formModel.value.maxStartTime = '';
  }
  
};
const onEndTimeSelect = (dateString: any, date: any) => {
  //不做任何操作
};
const onEndTimeChange = (dateString: any, date: Date[]) => {
  if(date!=undefined){
    formModel.value.minEndTime = dayjs(date[0]).valueOf() + '';
    formModel.value.maxEndTime = dayjs(date[1]).valueOf() + '';
  }else{
    formModel.value.minEndTime = '';
    formModel.value.maxEndTime = '';
  }
  
};

const handleSelectSearch = async (value: any) => {
    selectLoading.value = true;
    const { data, code } = await cfCarParkSearch({
      params: {
        name: value,
        page: 1,
        size: 200,
      },
    });
    selectLoading.value = false;
    if (code === 10002) {
      parkList.value = data;
    } else {
      parkList.value = [];
    }
};

const showPackageImport = () => {
  packageImportRef.value.handleClick();
}
const showPackageBuyImport = () => {
  packageBuyRef.value.handleClick(selectedKeys.value);
}
const getCarType = async () => {
  const { data, code, message } = await getCarTypeListByQuery({
    params: {
      page: 1,
      size: 200,
    },
  });
  if (code === 10002) {
    carTypeList.value = data;
  } else {
    // @ts-ignore
    // Message.error(message);
  }
};
const pageChange = (e: number) => {
  pagination.current = e;
  fetchData();
};
const handleAdd = () => {
  editAddRef.value.handleClick();
};
const handleAddHomeGroupPackage = () => {
  addHomeGroupPackageRef.value.handleClick();
};
const handleEdit = (e: any) => {
  editAddRef.value.handleClick(e);
};
const search = () => {
  pagination.current = 1;
  fetchData();
};
const getCarTypeName = (key: string) => {
  // @ts-ignore
  const findRes: any = carTypeList.value.find((i) => i.flagKey === key);
  return findRes?.name;
};
const checkParams = (obj: any) => {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const i in obj) {
    if (!obj[i]) {
      if (obj[i] !== 0) {
        obj[i] = null;
      }
    }
  }
  return obj;
};
const fetchData = async () => {
  selectedKeys.value = [];
  loading.value = true;
  // @ts-ignore
  const { data, code, total } = await packageListGet({
    params: checkParams({
      page: pagination.current,
      size: pagination.pageSize,
      numberPlate: formModel.value.numberPlate,
      carOwnerName: formModel.value.carOwnerName,
      carParkId: formModel.value.carParkId,
      minStartTime: formModel.value.minStartTime,
      maxStartTime: formModel.value.maxStartTime,
      minEndTime: formModel.value.minEndTime,
      maxEndTime: formModel.value.maxEndTime,
      groupFlag: formModel.value.groupFlag,
      status: formModel.value.status,
      roomNo: formModel.value.roomNo,
      typeKey: formModel.value.typeKey,
    }),
  });
  loading.value = false;
  if (code === 10002) {
    // @ts-ignore
    if (total) pagination.total = total;
    for (const i of data) {
      i.newStartTime = parseTime(i.startTime);
      i.newEndTime = parseTime(i.endTime);
      i.newSpecialGive = i.specialGive ? '是' : '否';
      i.newIssuedWhitelist = i.issuedWhitelist ? '已下发' : '未下发';
      i.newTransRegional = i.transRegional ? '是' : '否';
      i.newStatus = i.status ? '正常' : '禁用';
      i.newTypeKey = getCarTypeName(i.typeKey);
    }
    state.list = data;
  } else {
    state.list = [];
  }
  // console.log(data, code, 999);
};
</script>

<script lang="ts">
export default {
  name: 'SearchTable',
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
