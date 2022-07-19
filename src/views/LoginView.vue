<template>
  <div class="box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="Btn" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="Btn" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// toRefs  解构使用
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import type { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "账号长度3到10之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "密码长度3到10之间",
          trigger: "blur",
        },
      ],
    };
    // 登录
    const ruleFormRef = ref<FormInstance>();
    // console.log(ruleFormRef);

    // 接收router'
    const router = useRouter();
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      // 对表单内容进行验证
      // valid布尔类型  为true表示验证成功
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            // console.log(res);
            // 保存token
            localStorage.setItem("token", res.data.token);
            // 跳转
            router.push("/");
          });
        } else {
          return false;
        }
      });
      // console.log(formEl);
    };
    // 重置
    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    };
    return { ...toRefs(data), rules, resetForm, ruleFormRef, submitForm };
  },
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../assets/1656339427726.png);
  padding: 1px;
  text-align: center;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: white;
    padding: 30px;
    border-radius: 40px;
  }
}

.Btn {
  width: 30%;
}

h2 {
  margin-bottom: 10px;
}
</style>
