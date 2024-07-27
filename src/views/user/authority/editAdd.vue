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
        {{ formData?.id ? '编辑权限' : '新增权限' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="模块名称"
                  field="module"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.module"
                    placeholder="请输入模块名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="权限名称"
                  field="name"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.name"
                    placeholder="请输入权限名称"
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
                  label="路由组件"
                  field="component"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.component"
                    placeholder="请输入路由组件"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="控制器名称"
                  field="controller"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.controller"
                    placeholder="请输入控制器名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="权限描述"
                  field="description"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.description"
                    placeholder="请输入权限描述"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="方法名称"
                  field="method"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.method"
                    placeholder="请输入方法名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="路由名称"
                  field="routerName"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.routerName"
                    placeholder="请输入路由名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="路由路径"
                  field="routerPath"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.routerPath"
                    placeholder="请输入路由路径"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="语言标识"
                  field="lang"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.lang"
                    placeholder="请输入语言标识"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="排序"
                  field="sortIndex"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.sortIndex"
                    placeholder="请输入排序"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否显示菜单" field="showMenu">
                  <a-select
                    v-model="formData.showMenu"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="是否隐藏面包屑" field="breadcrumbHidden">
                  <a-select
                    v-model="formData.breadcrumbHidden"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="图标" field="icon" validate-trigger="input">
                  <a-input
                    v-model="formData.icon"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
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
  import { cfAuthAdd, cfRoleGet, cfAuthUpdate } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    breadcrumbHidden: '',
    component: '',
    controller: '',
    description: '',
    icon: '',
    lang: '',
    method: '',
    module: '',
    name: '',
    routerName: '',
    routerPath: '',
    showMenu: '',
    sortIndex: '',
    id: '',
  });
  const roleList = ref([]);
  const getRole = async () => {
    // @ts-ignore
    const { data, code } = await cfRoleGet({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      roleList.value = data;
    }
  };
  const handleClick = (e: any = null) => {
    if (e.type === 'add') {
      visible.value = true;
      getRole();
    }
    if (e.type === 'add_params') {
      const newInfo = JSON.parse(JSON.stringify(e.data));
      newInfo.password = null;
      newInfo.id = '';
      formData.value = newInfo;
      visible.value = true;
      getRole();
    }
    if (e.type === 'edit') {
      const newInfo = JSON.parse(JSON.stringify(e.data));
      newInfo.password = null;
      formData.value = newInfo;
      visible.value = true;
      getRole();
    }
  };
  const resetFields = () => {
    formRef.value.resetFields();
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await cfAuthUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfAuthAdd(formData.value);
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
