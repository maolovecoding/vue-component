module.exports = {
  title: "M-UI",
  description: "mao UI",
  themeConfig: {
    lastUpdate: "最后更新时间",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "编辑此网站",
    repo: "http://github.com/maolovecoding",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present M-UI Mao"
    },
    nav: [
      {
        text: "指南",
        link: "/guide/installation",
        activeMatch: "/guide/"
      },
      {
        text: "组件",
        link: "/component/icon",
        activeMatch: "/component/"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "安装", link: "/guide/installation" },
            { text: "快速开始", link: "/guide/quickStart" }
          ]
        }
      ],
      "/component/": [
        {
          text: "基础组件",
          items: [{ text: "icon", link: "/component/icon" }]
        }
      ]
    }
  }
};
