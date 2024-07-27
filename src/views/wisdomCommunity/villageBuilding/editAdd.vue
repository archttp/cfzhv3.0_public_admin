<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        {{ formData?.id ? '编辑楼栋' : '新增楼栋' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="小区"
                  field="villageId"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.villageId"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.id"
                      v-for="item in wisdomCommunity"
                      :key="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼栋名称"
                  field="name"
                  validate-trigger="input"
                  required
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
                  label="建筑类型"
                  field="buildingType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.buildingType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in buildingTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="住宅类型"
                  field="residentialType"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.residentialType"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option
                      :value="item.value"
                      v-for="item in residentialTypeArr"
                      :key="item.value"
                      >{{ item.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="管理员联系方式"
                  field="adminerPhone"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.adminerPhone"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="海拔"
                  field="altitude"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.altitude"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="层高"
                  field="floorHeight"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.floorHeight"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="消防等级"
                  field="fireProtectionLevel"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.fireProtectionLevel"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼层数"
                  field="floors"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.floors"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="建筑高度"
                  field="height"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.height"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="住户数量"
                  field="householdCount"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.householdCount"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="电梯配置"
                  field="liftConfiguration"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.liftConfiguration"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">无电梯</a-option>
                    <a-option :value="1">客梯</a-option>
                    <a-option :value="2">客梯和货梯</a-option>
                  </a-select>
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
              <a-col :span="8">
                <a-form-item
                  label="居住人口数量"
                  field="residentPopulation"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.residentPopulation"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="抗震级别"
                  field="seismicResistanceLevel"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.seismicResistanceLevel"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="是否拥有紧急避难所"
                  field="shelter"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.shelter"
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
                  label="单元数量"
                  field="units"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.units"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="使用年限"
                  field="usefulLife"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.usefulLife"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="楼栋编号"
                  field="buildingNumber"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.buildingNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="竣工日期"
                  field="completionDate"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.completionDate"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="施工单位"
                  field="constructionCompany"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.constructionCompany"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="施工日期"
                  field="constructionDate"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.constructionDate"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="施工负责人"
                  field="constructionManager"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.constructionManager"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="图片"
                  field="expirationTime"
                  validate-trigger="input"
                >
                  <a-upload
                    :action="apiHost+'/file/cfFile/upload'"
                    :file-list="faceImagesFile ? [faceImagesFile] : []"
                    :headers="header"
                    :data="uploadData"
                    :show-file-list="false"
                    @change="onFaceChange"
                    @progress="onFaceProgress"
                    @success="onFaceSuccess"
                  >
                    <template #upload-button>
                      <div
                        :class="`arco-upload-list-item${
                          faceImagesFile && faceImagesFile.status === 'error'
                            ? ' arco-upload-list-item-error'
                            : ''
                        }`"
                      >
                        <div
                          v-if="faceImagesFile && faceImagesFile.url"
                          class="arco-upload-list-picture custom-upload-avatar"
                        >
                          <img :src="faceImagesFile.url" />
                          <div class="arco-upload-list-picture-mask">
                            <IconEdit />
                          </div>
                          <a-progress
                            v-if="
                              faceImagesFile.status === 'uploading' &&
                              faceImagesFile.percent < 100
                            "
                            :percent="faceImagesFile.percent"
                            type="circle"
                            size="mini"
                            :style="{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              transform: 'translateX(-50%) translateY(-50%)',
                            }"
                          />
                        </div>
                        <div v-else class="arco-upload-picture-card">
                          <div class="arco-upload-picture-card-text">
                            <IconPlus />
                            <div style="margin-top: 10px; font-weight: 600"
                              >Upload</div
                            >
                          </div>
                        </div>
                      </div>
                    </template>
                  </a-upload>
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
  import {
    addBuilding,
    updateBuilding,
    wisdomCommunityGet,
  } from '@/api/wisdomCommunity';
  import { Message } from '@arco-design/web-vue';
  import { getToken } from '@/utils/auth';
  const apiHost = import.meta.env.VITE_API_BASE_URL;

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    adminerPhone: '',
    altitude: '',
    buildingType: '',
    completionDate: '',
    constructionCompany: '',
    constructionDate: '',
    constructionManager: '',
    fireProtectionLevel: '',
    floorHeight: '',
    floors: '',
    height: '',
    householdCount: '',
    images: '',
    liftConfiguration: '',
    name: '',
    positionX: '',
    positionY: '',
    residentPopulation: '',
    residentialType: '',
    seismicResistanceLevel: '',
    shelter: '',
    units: '',
    usefulLife: '',
    buildingNumber: '',
    villageId: '',
    id: '',
  });
  const residentialTypeArr = [
    { value: 1, label: '商品房' },
    { value: 2, label: '房改房' },
    { value: 3, label: '存量房' },
    { value: 4, label: '集资房' },
    { value: 5, label: '平价房' },
    { value: 6, label: '解困房' },
    { value: 7, label: '再上市房' },
    { value: 8, label: '廉租住房' },
    { value: 9, label: '花园式住宅' },
    { value: 10, label: '公寓式住宅' },
    { value: 11, label: '经济适用住房' },
    { value: 12, label: '限价房' },
    { value: 13, label: '商业综合体' },
    { value: 14, label: '商业街' },
    { value: 15, label: '写字楼办公区' },
    { value: 16, label: '工业园区' },
    { value: 17, label: '社会组织机构区' },
    { value: 18, label: '政府组织机构区' },
    { value: 19, label: '武警部队区' },
    { value: 20, label: '学校组织区域' },
  ];

  const buildingTypeArr = [
    { value: 1, label: '普通单元式住宅' },
    { value: 2, label: '公寓式住宅' },
    { value: 3, label: '复式住宅' },
    { value: 4, label: '跃层式住宅' },
    { value: 5, label: '花园洋房式住宅' },
    { value: 6, label: '小户型住宅' },
    { value: 7, label: '办公写字楼' },
    { value: 8, label: '工业房' },
    { value: 9, label: '社会组织活动楼' },
  ];
  const wisdomCommunity = ref([]);

  // 上传相关
  const uploadData: any = ref({
    fileType: 1,
    scene: 'user_avatar',
  });
  const header: any = ref({
    Authorization: getToken(),
  });
  const faceImagesFile = ref({
    url: '',
  });
  const onFaceChange = (_: any, currentFile: any) => {
    faceImagesFile.value = {
      ...currentFile,
      // url: URL.createObjectURL(currentFile.file),
    };
  };
  const onFaceProgress = (currentFile: any) => {
    faceImagesFile.value = currentFile;
  };
  const onFaceSuccess = (fileRes: any) => {
    formData.value.images = fileRes.response.data.id;
  };

  const handleClick = (e: any = null) => {
    getWisdomCommunityList();
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      formData.value = newInfo;
    }
    visible.value = true;
  };
  const getWisdomCommunityList = async () => {
    // @ts-ignore
    const { data, code } = await wisdomCommunityGet({
      params: {
        page: 1,
        size: 999,
      },
    });
    if (code === 10002) {
      wisdomCommunity.value = data;
    } else {
      wisdomCommunity.value = [];
    }
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await updateBuilding(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await addBuilding(formData.value);
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
