/**
 * @name 子应用注册表数据
 */
const subApps = [
  {
    module: "subapp-template", // 模块名，和子应用目录名、package.js name 一致
    defaultRegister: true, // 是否默认显示子应用，只能存在一个true
    entry: "//localhost:2770", // 开发环境子应用入口，为你运行时子应用ip+port
    depEntry: "http://", // 生产环境子应用入口，为线上地址
    routerBase: "/Examples", // 子应用routerBase，此子应用的路由都会挂上此前缀
    redirect: "/Examples/GlobalState", // 子应用默认打开的路由地址
    data: [
      // 子应用模块及菜单、路由数据
      {
        subKey: "sub2", //菜单key
        title: "示例", //菜单title
        icon: "build", //菜单icon
        redirect: "/Examples/GlobalState", //菜单redirect地址
        children: [
          {
            itemKey: "GlobalState", //子菜单key
            icon: "build", //子菜单icon children中只有一项时 显示子菜单title和icon
            title: "全局状态管理", //子菜单title
            url: "/Examples/GlobalState", //子应用页面路由
          },
          {
            itemKey: "Test1",
            icon: "build",
            title: "单级菜单示例",
            url: "/Examples/Test1",
          },
        ],
      },
      {
        subKey: "sub3",
        title: "单级菜单",
        icon: "build",
        redirect: "/Examples/Test1",
        children: [
          {
            itemKey: "Test1",
            icon: "build",
            title: "单级菜单示例",
            url: "/Examples/Test1",
          },
        ],
      },
      {
        subKey: "sub4",
        title: "多级菜单",
        icon: "build",
        redirect: "/Examples/Menu1-1/Menu1-1-1",
        children: [
          {
            subKey: "Menu1-1-1",
            title: "Menu1-1-1",
            children: [
              {
                itemKey: "Menu1-1/Menu1-1-1",
                title: "Menu1-1-1",
                url: "/Examples/Menu1-1/Menu1-1-1",
              },
            ],
          },
          {
            itemKey: "Menu1-2",
            title: "Menu1-2",
            url: "/Examples/Menu1-2",
          },
        ],
      },
    ],
  },
];

/**
 * @time 2020.05.20
 * @name 无需服务端获取的微应用
 */
const href = "http://" + $HOST;

// 无需登录的应用
const noAuthApps = [
  {
    module: "subapp",
    defaultRegister: true,
    entry: href + ":2770",
    routerBase: "/Login",
    redirect: "/Login",
    useExternals: true,
    data: [
      {
        title: "Login",
        children: [
          {
            title: "Login",
            url: "/Login",
          },
        ],
      },
    ],
  },
];

// 需要登陆身份但是和模块菜单授权无关的子应用
const nextAuthApps = [];

export { noAuthApps, nextAuthApps, subApps };
