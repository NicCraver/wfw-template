<template>
  <div>
    全局状态管理
    <el-button @click="handleVuexMsgChange">handleVuexMsgChange</el-button>
  </div>
</template>

<script>
import { setState } from "@/utils/app-store";
export default {
  mounted () {
    console.log(`$store.getters.msg`, this.$store.getters.msg);
  },
  methods: {
    handleVuexMsgChange() {
      setState({
        msg: '子应用-----------',
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
