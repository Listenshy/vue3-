<template>
  <div>
    <!-- ref  用户所有信息 -->
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="authority"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button @click="changeAuthority">确认修改 </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { InieData } from "../type/authority";
import { getAuthorityList } from "../request/api";
export default defineComponent({
  setup() {
    const route = useRoute();
    const params: any = route.params;
    const data = reactive(new InieData(params.id, params.authority));
    // console.log(data);
    onMounted(() => {
      Authority();
    });
    const Authority = async () => {
      let res = await getAuthorityList();
      console.log(res);

      data.list = res.data;
    };
    const changeAuthority = () => {
      console.log(
        // 获取权限  正常应该发给后端
        data.treeRef.getCheckedKeys().sort((a1: number, a2: number) => {
          return a1 - a2;
        })
      );
    };
    return { ...toRefs(data), changeAuthority };
  },
});
</script>

<style scoped></style>
