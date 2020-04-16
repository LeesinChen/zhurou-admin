module.exports = [
  {
    path: '/',
    component: '../pages/index', // 默认页面
    routes: [
      { path: '/', redirect: '/dashboard' },
      { path: '/dashboard', icon: 'bar-chart', name: '数据', component: '../pages/dashboard', },
      { path: '/banner', icon: 'desktop', name: '首页轮播图', component: '../pages/dashboard', },
      { path: '/goods', icon: 'gift', name: '商品管理', component: '../pages/goods/list', },
      { path: '/goods/add', component: '../pages/goods/edit', },
      { path: '/goods/edit', component: '../pages/goods/edit', },

      { path: '/order', icon: 'shopping-cart', name: '订单管理', component: '../pages/dashboard', },

      { path: '/login', component: '../pages/login', },
    ]
  },
  { path: '/login', component: '../pages/login', },
  {
    component: './404'
  }
]
