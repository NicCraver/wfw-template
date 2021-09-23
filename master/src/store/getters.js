const getters = {
  menu: state => state.menu.menu,
  page_title: state => state.menu.page_title,
  layout_model: state => state.menu.layout_model,
  is_collapse: state => state.menu.is_collapse,
  size: state => state.app.size,
  token: state => state.app.token,
  msg: state => state.appstore.msg,
}

export default getters