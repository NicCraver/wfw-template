<template>
  <div class="TheHeader">
    <div class="the-header-menu">
      <div v-if="layout_model === 'inline'"><slot name="icon"></slot></div>
      <div v-else class="header-menu">
        <div class="header-logo">
          <img src="../assets/anx-logo@3x.png" alt="" />
          <div>肿瘤规范化诊疗</div>
        </div>
        <div>
          <slot name="menu"></slot>
        </div>
      </div>
      <div class="header-action">
        <div class="msg">{{ msg }}</div>
        <div class="dep">肿外</div>
        <el-dropdown placement="bottom" @command="handleCommand">
          <div class="name">刘洛</div>
          <el-dropdown-menu slot="dropdown" class="name-dropdown">
            <el-dropdown-item command="setup">设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a-icon
          @click="logOut()"
          class="poweroff"
          style="fontSize: 18px;"
          type="poweroff"
        />
      </div>
    </div>
    <div class="the-header-title">{{ page_title }}</div>
    <el-drawer
      custom-class="drawerClass"
      title="项目配置"
      :visible.sync="direction"
      direction="rtl"
      size="25%"
    >
      <el-scrollbar class="drawer-scroll">
        <el-divider content-position="center">导航栏模式</el-divider>
        <div class="meunModel">
          <div @click="changeSvgName('inline')">
            <IconSvg
              class="inline"
              :style="{
                border:
                  layout_model === 'inline'
                    ? '2px solid #0960bd'
                    : '2px solid #3A3A3B',
              }"
              svgName="inline"
            />
          </div>
          <div @click="changeSvgName('horizontal')">
            <IconSvg
              class="horizontal"
              :style="{
                border:
                  layout_model === 'horizontal'
                    ? '2px solid #0960bd'
                    : '2px solid #3A3A3B',
              }"
              svgName="horizontal"
            />
          </div>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Storage } from "anx-core"; // 导入存储函数
import IconSvg from "./IconSvg.vue";
export default {
  components: {
    IconSvg,
  },
  data() {
    return {
      msg: "质控月报：本月质控提示30次；完成20次；忽略5次",
      direction: false,
      headerScreenWidth: 0, //头部总宽度
      headerActionRefWidth: 0,
    };
  },
  computed: {
    ...mapGetters(["layout_model", "page_title"]),
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      if (command === "setup") {
        this.direction = true;
      }
    },
    changeSvgName(name) {
      console.log(`changeSvgName`, name);
      if (this.layout_model === name) {
        return;
      }
      this.$store.dispatch("menu/setLayoutModel", name);
    },
    // 退出登录
    logOut() {
      this.$confirm("是否确认退出系统?", "温馨提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Storage.remove("token");
          location.reload();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.TheHeader {
  .the-header-menu {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-menu {
      display: flex;
      align-items: center;
      .header-logo {
        min-width: 211px;
        align-items: center;
        display: flex;
        color: rgba(255, 255, 255, 100);
        font-size: 20px;
        font-weight: bold;
        padding: 0 0 0 20px;
        img {
          width: 45px;
          height: 45px;
          margin-right: 6px;
        }
      }
    }
    .header-action {
      min-width: 500px;
      display: flex;
      align-items: center;
      margin-right: 24px;
      .msg {
        padding: 0 14px;
        height: 42px;
        line-height: 42px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 1);
        opacity: 0.96;
        color: #fff;
        font-weight: bold;
        margin-right: 16px;
      }
      .dep {
        width: 42px;
        height: 42px;
        line-height: 42px;
        color: rgba(16, 16, 16, 100);
        font-size: 14px;
        text-align: center;
        background: #fff;
        border-radius: 50%;
        margin-right: 8px;
      }
      .name {
        margin-right: 8px;
        color: #fff;
        padding: 0 8px;
        cursor: pointer;
      }
      .name:hover {
        background: #333;
      }
      .poweroff {
        svg {
          width: 18px;
          height: 18px;
        }
        cursor: pointer;
      }
      .poweroff:hover {
        color: #1890ff;
      }
    }

    .meunModel {
      display: flex;
      align-items: center;
      svg {
        outline: none !important;
      }
      .inline {
        cursor: pointer;
        position: relative;
        width: 54px;
        height: 46px;
        margin-right: 16px;
        background-color: #3a3a3b;
        border-radius: 4px;
        border: 2px solid #0960bd;
      }
      .inline:hover {
        border: 2px solid #0960bd;
      }
      .horizontal {
        cursor: pointer;
        position: relative;
        width: 54px;
        height: 46px;
        margin-right: 16px;
        background-color: #3a3a3b;
        border-radius: 4px;
        border: 2px solid #0960bd;
      }
      .horizontal:hover {
        box-sizing: border-box;
        border: 2px solid #0960bd;
      }
    }
  }
  .the-header-title {
    margin-left: 16px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
<style lang="scss">
.name-dropdown {
  background-color: #3f3f3f !important;
  border: 1px solid #3f3f3f !important;
  .el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    outline: 0;
  }
  .popper__arrow {
    border-bottom-color: #3f3f3f !important;
  }
  .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #3f3f3f !important;
  }
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #1890ff !important;
    color: #fff !important;
  }
}
.drawerClass {
  color: #fff;
  height: 24px;
  line-height: 24px;
  .el-drawer__header {
    align-items: center;
    color: #fff;
    display: flex;
    margin-bottom: 0;
    padding: 0 10px 0 20px;
    background: #232323;
    opacity: 0.96;
    font-size: 16px;
    line-height: 62px;
  }
  .el-drawer__body {
    padding: 10px;
    background: #3a3a3b;
  }
  .el-divider {
    background-color: #2c2c2c;
    position: relative;
  }
  .el-divider__text {
    position: absolute;
    background-color: #3a3a3b;
    padding: 0 20px;
    color: #fff;
  }
  .drawer-scroll {
    width: 100%;
    height: 100%;
    background: #3a3a3b;
    border-radius: 4px;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
