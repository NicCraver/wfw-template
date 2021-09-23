import http from "./__http__";

// 1获取菜单数据接口
export const getAppConfigsApi = () =>
  http.get({
    url: "/Api/GetAppConfigs",
  });
