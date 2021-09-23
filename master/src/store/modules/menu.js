export default {
  namespaced: true,
  state: {
    page_title: "", //标题
    layout_model: "horizontal", //layout状态 inline horizontal
    is_collapse: false, // 折叠状态
    menu: [], // 菜单数据
  },
  mutations: {
    // 推入用户菜单
    SET_MENU(state, data) {
      state.menu = data;
    },
    // 设置折叠状态
    SET_COLLAPSE_STATUS(state, data) {
      state.is_collapse = data;
    },
    // 设置LAYOUT状态
    SET_LAYOUT_MODEL(state, data) {
      state.layout_model = data;
    },
    // 设置标题
    SET_PAGE_TITLE(state, data) {
      state.page_title = data;
    },
  },
  actions: {
    // 推入用户菜单
    setMenu({ commit }, data) {
      commit("SET_MENU", data);
    },
    // 设置折叠状态
    setCollapseStatus({ commit }, data) {
      commit("SET_COLLAPSE_STATUS", data);
    },
    // 设置LAYOUT状态
    setLayoutModel({ commit }, data) { 
      commit("SET_LAYOUT_MODEL", data);
    },
    // 设置标题
    setPageTitle({ commit }, data) { 
      commit("SET_PAGE_TITLE", data);
    },
  },
};
