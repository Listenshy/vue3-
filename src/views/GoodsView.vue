<template>
  <div>
    <div class="select">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="dataList.comList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="表题" width="180" />
        <el-table-column prop="introduce" label="详情" />
      </el-table>
    </div>
    <!--  @size-change="sizeChange"  条数改变-->
    <el-pagination
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="selectData.count"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  onMounted,
} from "vue";
import { getGoodList } from "../request/api";
import { InitData, ListInt } from "../type/goods";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getGood();
    });
    const getGood = () => {
      getGoodList().then((res) => {
        data.list = res.data;
        data.selectData.count = res.data.length;
      });
    };

    // 计算属性
    const dataList = reactive({
      comList: computed(() => {
        // 1..10  11..20  数组截取
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        );
      }),
    });

    // 新当前页
    const currentChange = (page: number) => {
      data.selectData.page = page;
    };
    // 新每页条数
    // const sizeChange = (pagesize: number) => {
    //   data.selectData.pagesize = pagesize;
    // };
    // return { ...toRefs(data), currentChange, sizeChange, dataList };

    const onSubmit = () => {
      //   console.log(data.selectData.title);
      let arr: ListInt[] = []; //定义数组  展示查询后要展示的数据
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = data.list.filter((value) => {
            return value.title.indexOf(data.selectData.title) != -1;
          });
        }
        if (data.selectData.introduce) {
          arr = data.list.filter((value) => {
            return value.title.indexOf(data.selectData.introduce) != -1;
          });
        }
      } else {
        arr = data.list;
      }
      data.list = arr;
      data.selectData.count = data.list.length;
    };
    // 输入框的两个属性
    watch(
      [() => data.selectData.title, () => data.selectData.introduce],
      (newval, oldval) => {
        // console.log(newval, oldval);
        if (data.selectData.title == "" && data.selectData.introduce == "") {
          getGood();
        }
      }
    );
    return { ...toRefs(data), currentChange, dataList, onSubmit };
  },
});
</script>

<style scoped></style>
