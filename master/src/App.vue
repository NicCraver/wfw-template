<template>
  <div>
    <div v-if="hasToken">
      <div v-if="!hasLaypout">
        <a-layout id="main-container">
          <a-layout-sider
            v-if="layout_model === 'inline'"
            v-model="is_collapse"
            :trigger="null"
            collapsible
          >
            <div class="logo" />
            <TheMenu class="main-menu-box" />
          </a-layout-sider>
          <a-layout>
            <a-layout-header
              style="background: #212121; padding: 0;height: 200px;"
            >
              <TheHeader>
                <template #icon v-if="layout_model === 'inline'">
                  <a-icon
                    class="trigger"
                    :type="is_collapse ? 'menu-unfold' : 'menu-fold'"
                    @click="changeCollapsed"
                  />
                </template>
                <template #menu v-if="layout_model === 'horizontal'">
                  <TheMenu class="main-menu-box" />
                </template>
              </TheHeader>
            </a-layout-header>
            <a-layout-content>
              <div class="main-container-content">
                <!-- 子应用渲染区 -->
                <div class="main-container-view">
                  <el-scrollbar class="anx-scroll">
                    <!-- qiankun2.0  container 模式-->
                    <div id="subapp-viewport" class="app-view-box"></div>
                  </el-scrollbar>
                </div>
              </div>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </div>
      <div v-else id="subapp-viewport" class="app-view-box"></div>
    </div>
    <!-- 非登录视图 -->
    <div v-else id="subapp-viewport" class="app-view-box"></div>
  </div>
</template>
<script>
import { Storage } from "anx-core";
import { nextAuthApps } from "./core/app-config";
import { mapGetters } from "vuex";
import TheMenu from "@/components/TheMenu.vue";
import TheHeader from "@/components/TheHeader.vue";
// import TheNav from "@/components/TheNav.vue";
export default {
  components: {
    TheMenu,
    TheHeader,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  watch: {
    // $route(newValue, oldValue) {
    //   console.log(`newValue`, newValue.path);
    //   if (newValue.path === "/Login") {
    //     Storage.remove("token");
    //     Storage.clear();
    //   }
    // },
  },
  computed: {
    ...mapGetters(["layout_model", "is_collapse"]),
    hasToken() {
      return !!this.$store.getters.token;
    },
    hasLaypout() {
      return nextAuthApps.indexOf(this.$route.path) > -1;
    },
  },
  mounted() {
    console.log(`this.layout_model`, this.layout_model);
    console.log(this.$route.query);
  },
  methods: {
    changeCollapsed() {
      this.$store.dispatch("menu/setCollapseStatus", !this.is_collapse);
    },
  },
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#main-container {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 80px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  .main-container-content {
    margin-top: -80px;
    // background: #000;
    // min-height: 280px;
    overflow: hidden;
    box-sizing: border-box;
    > .main-container-view {
      margin: 16px;
      padding: 10px 5px 10px 10px;
      height: calc(100vh - 152px);
      background: #fff;
      border-radius: 4px;
      .anx-scroll {
        width: 100%;
        height: 100%;
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
    }
  }
}
</style>
