<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4"
              ><img src="../assets/logo.png" alt="" class="logo"
            /></el-col>
            <el-col :span="16"><h2>1234567890-</h2></el-col>
            <el-col :span="4">
              <el-button @click="delToken"> 退出 </el-button></el-col
            >
          </el-row></el-header
        >

        <el-container>
          <el-aside width="200px">
            <!-- router 开启路由模式 （可借助index进行跳转）-->
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              :default-active="active"
              text-color="#fff"
              router
            >
              <!-- index 唯一标志 -->
              <el-menu-item
                :index="item.path"
                v-for="(item, index) in list"
                :key="index"
              >
                <span>{{ item.meta.title }}</span>
              </el-menu-item>
            </el-menu></el-aside
          >

          <el-main>
            <!-- 出口 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const list = router.getRoutes().filter((v) => v.meta.isShow);
    const active = route.path;
    // console.log(list);
    const delToken = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return { list, active, delToken };
  },
});
</script>
<style lang="scss" scoped>
.el-header {
  height: 80px;
  background-color: #666;
  .logo {
    height: 80px;
  }
  h2,
  .quitlogin {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: white;
  }
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
.el-button {
  margin-top: 25px;
}
</style>
