<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="600"
      draggable
      :footer="false"
      @close="modalClose"
    >
      <template #title> 分配权限 </template>

      <a-tree
        ref="treeRef"
        :fieldNames="{
          key: 'key',
          title: 'title',
          children: 'children',
          icon: 'path',
        }"
        :checkable="true"
        :data="treeData"
        @check="treeCheck"
        :check-strictly="true"
      />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { cfAuthGet, selectTreeByRole, addRoleAuth } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const treeRef = ref();
  const treeData = ref([]);
  const roleId = ref('');
  const rchoStatus = ref(false);

  const checkedKeys: any = ref([]);

  const modalClose = () => {
    rchoStatus.value = false;
    treeData.value = [];
    roleId.value = '';
    treeRef.value.selectAll(false);
  };
  const getRoleAllList = async (id = '') => {
    const { data, code } = await cfAuthGet();
    if (code === 10002) {
      console.log('treeData', makeRoutesTreeData(data));
      // @ts-ignore
      treeData.value = makeRoutesTreeData(data);
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
  const getRoleList = async (id: string) => {
    treeRef.value.checkAll(false);
    const { data, code } = await selectTreeByRole({
      params: {
        roleId: id,
      },
    });
    const authorizedIds: string[] = [];
    const getId = (value: any) => {
      for (const i in value) {
        if (value[i].authorized === 1) {
          console.log(value[i], 84);

          authorizedIds.push(value[i].id);
          if (value[i].children !== null && value[i].children.length > 0) {
            getId(value[i].children);
          }
        }
      }
    };
    console.log(authorizedIds, 'authorizedIds');

    if (code === 10002) {
      getId(data);
      for (const i of authorizedIds) {
        treeRef.value.checkNode(i, true, true);
      }
      rchoStatus.value = true;
    }
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

  const treeCheck = async (e: any) => {
    const checkArrs = treeRef.value.getCheckedNodes();
    const checkIds = checkArrs.map((i: any) => i.key);
    if (rchoStatus.value) {
      const { data, code, message } = await addRoleAuth({
        roleId: roleId.value,
        authIdList: checkIds,
      });
      console.log(data, code);
      if (code === 10002) {
        Message.success(message);
      }
    }
  };
  const handleClick = async (e: any = null) => {
    await getRoleAllList();
    await getRoleList(e.id);
    if (e.id) {
      roleId.value = e.id;
    }
    visible.value = true;
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
