<template>
  <div>
    <div class="select">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="selectData.role"
            class="m-2"
            placeholder="请选择"
            size="large"
            link
          >
            <!-- 疑问  :value="0"-->
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />
        <el-table-column prop="role" label="角色">
          <!-- 插槽 -->
          <template #default="scope">
            <el-button
              v-for="(item, index) in scope.row.role"
              :key="index"
              type="text"
              size="small"
            >
              {{ item.roleName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="操作">
          <!-- 插槽 -->
          <template #default="scope">
            <el-button
              type="primary "
              size="small"
              @click="changeUser(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="isShow" title="编辑信息">
      <el-form :model="active">
        <el-form-item label="姓名" label-width="50px">
          <el-input v-model="active.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="50px">
          <!-- multiple  多选 -->
          <el-select multiple v-model="active.role" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updataUser()">更改</el-button>
          <el-button type="primary" @click="isShow = false">返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { getUserList, getRoleList } from "../request/api";
import { InitData, ListInt } from "../type/user";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getUser();
      getRole();
    });
    const getUser = async () => {
      let user = await getUserList();
      // console.log(user);
      data.list = user.data;
    };
    const getRole = async () => {
      let Role = await getRoleList();
      // console.log(Role);
      data.roleList = Role.data;
    };
    const onSubmit = () => {
      let arr: ListInt[] = [];
      // console.log(data.list);
      if (data.selectData.nickName || data.selectData.role) {
        if (data.selectData.nickName) {
          arr = data.list.filter((item) => {
            return item.nickName.indexOf(data.selectData.nickName) != -1;
          });
        }
        if (data.selectData.role) {
          arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
            // console.log(value);
            return value.role.find((item: { role: number }) => {
              // console.log(item.role, data.selectData.role);
              return item.role == data.selectData.role;
            });
          });
        }
      } else {
        arr = data.list;
      }
      // console.log(arr);
      data.list = arr;
    };
    watch([() => data.selectData.nickName, () => data.selectData.role], () => {
      // 每次执行触发
      if (data.selectData.nickName == "" || data.selectData.role == 0) {
        getUser();
      }
    });
    // 编辑
    const changeUser = (row: ListInt) => {
      console.log(row.role);
      data.active = {
        id: row.id,
        nickName: row.nickName,
        role: row.role.map((value: any) => {
          return value.role || value.roleId;
        }),
        userName: row.userName,
      };
      // console.log(data.active);

      data.isShow = true;
    };
    // 编辑确定
    const updataUser = () => {
      // find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined
      // find只查出第一个符合条件的结果像例子里是直接返回了一个对象而不是数组！，而filter返回全部结果仍然是数组。
      let obj: any = data.list.find((value) => {
        return value.id == data.active.id;
      });
      // console.log(obj);
      obj.nickName = data.active.nickName;
      obj.role = data.roleList.filter((value: any) => {
        return data.active.role.indexOf(value.roleId) != -1;
      });
      // console.log(obj.role);
      data.list.forEach((item, index) => {
        if (item.id == obj.id) {
          data.list[index] = obj;
        }
      });
      data.isShow = false;
    };
    return { ...toRefs(data), onSubmit, changeUser, updataUser };
  },
});
</script>

<style scoped></style>
