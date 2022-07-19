<template>
  <div>
    <div class="select">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="addRole">添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="roleId" label="ID" width="180" />
        <el-table-column prop="roleName" label="角色名" width="180" />
        <el-table-column prop="authority" label="操作">
          <!-- 插槽  scope.row  是 authority-->
          <template #default="scope">
            <el-button type="text" size="small" @click="changRole(scope.row)">
              修改权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getRoleList } from "../request/api";
import { InitData, ListInt } from "../type/role";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    onMounted(() => {
      RoleList();
    });
    const RoleList = async () => {
      let Role = await getRoleList();
      //   console.log(Role);
      data.list = Role.data;
    };
    const addRole = () => {
      ElMessageBox.prompt("请输入角色名称", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          // value  输入框中的值
          if (value) {
            data.list.push({
              roleId: data.list.length + 1,
              roleName: value,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: `${value}角色添加成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    };
    const changRole = (row: ListInt) => {
      //   console.log(row);
      router.push({
        name: "authority",
        params: {
          id: row.roleId,
          //   转字符串
          authority: row.authority,
        },
      });
    };
    return { ...toRefs(data), addRole, changRole };
  },
});
</script>

<style scoped></style>
