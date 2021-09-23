<template>
  <div v-if="layout_model === 'inline'">
    <a-menu
      theme="dark"
      mode="inline"
      :default-selected-keys="activeMenu"
      :default-open-keys="openKeys"
      @click="goto"
    >
      <template v-for="(item, i) in menu">
        <a-menu-item
          v-if="item.children && item.children.length === 1"
          :key="item.children[0].url"
        >
          <a-icon :type="item.children[0].icon" />
          <span>{{ item.children[0].title }}</span>
        </a-menu-item>
        <SubMenu
          v-else
          :menuItem="item"
          :layout_model="layout_model"
          :key="i"
        ></SubMenu>
      </template>
    </a-menu>
  </div>
  <div v-else class="horizontal-menu">
    <a-menu v-model="current" mode="horizontal" @click="goto">
      <template v-for="(item, i) in menu">
        <a-menu-item
          v-if="item.children && item.children.length === 1"
          :key="item.children[0].url"
        >
          <!-- <a-icon :type="item.children[0].icon" /> -->
          <span>{{ item.children[0].title }}</span>
        </a-menu-item>
        <SubMenu
          v-else
          :menuItem="item"
          :layout_model="layout_model"
          :key="i"
        ></SubMenu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // 引入状态共享
import { routerGo } from "@/utils/utils.js"; // 引入跨应用路由跳转
import SubMenu from "./SubMenu.vue";
export default {
  name: "theMenu",
  components: { SubMenu },
  data() {
    return {
      current: [],
      openKeys: [],
    };
  },
  computed: {
    activeMenu() {
      this.setPageTitle();
      return [this.$route.path];
    },
    // 导入vuex菜单数据，菜单折叠状态
    ...mapGetters(["menu", "layout_model", "is_collapse"]),
  },
  watch: {
    $route(newValue, oldValue) {
      this.setPageTitle();
      this.current = [this.$route.path];
    },
    current(newValue, oldValue) {
      this.setPageTitle();
    },
    menu(newValue, oldValue) {
      this.setOpenKeys();
    },
    is_collapse(newValue, oldValue) {
      this.setOpenKeys();
    },
  },
  created() {
    this.setPageTitle();
    this.setOpenKeys();
    this.current = [this.$route.path];
  },
  methods: {
    setPageTitle() {
      let tempMenu = JSON.parse(JSON.stringify(this.menu));
      let path = this.$route.path;
      function find(arr, url) {
        if (arr == null) return null;
        for (let obj of arr) {
          if (obj.url == path) {
            return obj;
          }
          let ret = find(obj.children, url);
          if (ret) return ret;
        }
        return null;
      }

      function collect(obj) {
        let ret = [obj.url];
        if (obj.children) {
          for (let o of obj.children) {
            ret = [...ret, ...collect(o)];
          }
        }
        return ret;
      }
      if (find(tempMenu)) {
        this.$store.dispatch("menu/setPageTitle", find(tempMenu).title);
      }
    },
    setOpenKeys() {
      if (this.is_collapse) {
        this.openKeys = [];
        return;
      }
      // 设置展开项
      this.menu.forEach((item) => {
        if (item.children && item.children.length > 1) {
          item.children.forEach((el) => {
            if (this.activeMenu[0].indexOf(el.url) > -1) {
              this.openKeys = [item.subKey];
              // console.log(`this.openKeys`, this.openKeys);
            }
          });
        }
      });
    },
    // 跨应用路由跳转
    goto(e) {
      console.log(`e`, e);
      routerGo(e.key);
    },
  },
};
</script>

<style lang="scss">
.ant-menu-inline-collapsed > .ant-menu-item,
.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-item,
.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-submenu
  > .ant-menu-submenu-title,
.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
  left: 0;
  padding: 0 32px !important;
  text-overflow: clip;
}
.horizontal-menu {
  margin-left: 64px;
  .ant-menu {
    background: #212121 !important;
    color: #fff;
    font-size: 18px;
    border-bottom: 1px solid #212121;
  }
  .ant-menu-item {
    padding: 0 5px;
    margin: 0 16px;
  }
  .ant-menu-submenu {
    padding: 0 5px;
    margin: 0 16px;
  }
  .ant-menu-submenu-title {
    padding: 0;
  }
  .ant-menu-horizontal > .ant-menu-item:hover,
  .ant-menu-horizontal > .ant-menu-submenu:hover,
  .ant-menu-horizontal > .ant-menu-item-active,
  .ant-menu-horizontal > .ant-menu-submenu-active,
  .ant-menu-horizontal > .ant-menu-item-open,
  .ant-menu-horizontal > .ant-menu-submenu-open,
  .ant-menu-horizontal > .ant-menu-item-selected,
  .ant-menu-horizontal > .ant-menu-submenu-selected {
    color: #fff;
    border-bottom: 2px solid #fff;
  }
  .ant-menu-submenu-title:hover {
    color: #fff;
  }
  .submenu-title-wrapper:hover {
    color: #fff;
  }
  .ant-menu-submenu-active {
    color: #fff;
    border-bottom: 2px solid #fff;
  }
  .ant-menu-submenu-popup {
    background: #212121 !important;
  }
}
</style>
