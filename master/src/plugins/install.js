import Vue from "vue";
import Element from "./element";
import "element-ui/lib/theme-chalk/index.css";
import ant from "./ant-design-vue";

// 注册组件
[...Element.components].forEach((i) => Vue.use(i));
[...ant.components].forEach((i) => Vue.component(i.name, i));

// 注册指令服务
Element.serve.forEach((i) => Vue.use(i.directive));

// 注册挂载方法
Element.methods.forEach((i) => {
  Vue.prototype[`$${i.name}`] = i.method;
});
