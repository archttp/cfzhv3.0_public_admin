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
        {{ formData?.id ? '编辑用户' : '新增用户' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="角色名称"
                  field="name"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.name"
                    placeholder="请输入角色名称"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="标识符"
                  field="flagKey"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.flagKey"
                    placeholder="请输入标识符"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  label="权限水平"
                  field="roleLevel"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.roleLevel"
                    placeholder="请输入权限水平"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="所属部门" field="departmentId" required>
                  <a-select
                    v-model="formData.departmentId"
                    placeholder="请选择所属部门"
                    allow-clear
                  >
                    <a-option
                      v-for="item in departmentList"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="角色描述"
                  field="description"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.description"
                    placeholder="请输入角色描述"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="角色图标"
                  field="icon"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.icon"
                    placeholder="请输入角色图标"
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
  import { cfRoleAdd, cfRoleUpdate, cfDepartmentGet } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    id: '',
    departmentId: '',
    description: '',
    flagKey: '',
    icon: '',
    name: '',
    roleLevel: '',
  });
  const departmentList = ref([]);
  const getDepartmentList = async () => {
    // @ts-ignore
    const { data, code } = await cfDepartmentGet({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      departmentList.value = data;
    }
  };
  const makeRoutesTreeData = (auths: any) => {
    const data = [];
    for (let auth of auths) {
      const tmp = {
        title: [],
        key: '',
        children: '',
      };
      tmp.title = auth.name;
      tmp.key = auth.id;
      if (auth.children) {
        // @ts-ignore
        tmp.children = makeRoutesTreeData(auth.children);
      }
      data.push(tmp);
    }
    return data;
  };
  const makeTreeData = (treeData: any) => {
    return checkedKeysFn(treeData);
  };
  const checkedKeysFn = (treeData: any) => {
    const checkedKeys: any = [];
    treeData.forEach((element: any) => {
      if (element.gained) {
        checkedKeys.push(element.id);
        // (this.$refs.tree as Tree).setChecked(element.id, true, false);
      }
      if (element.children) {
        let tmp = checkedKeysFn(element.children);
        if (tmp.length > 0) {
          checkedKeys.push(...tmp);
        }
      }
    });
    return checkedKeys;
  };
  const handleClick = (e: any = null) => {
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      formData.value = newInfo;
    }
    visible.value = true;
    getDepartmentList();
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
        const { code } = await cfRoleUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfRoleAdd(formData.value);
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
