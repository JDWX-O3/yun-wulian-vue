import Vue from 'vue';
import Router from 'vue-router';
import Nindex from '../components/newpage/index.vue'
Vue.use(Router);

const routes = [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'Index',
            component: Nindex
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                // {
                //     path: '/',
                //     //name: '/',
                //     component: resolve => require(['../components/page/Readme.vue'], resolve)
                // },
                {
                    path: '/basetable',
                    name: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/projectmanage',
                    component: resolve => require(['../components/page/ProjectManage.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/devicemanage',
                    component: resolve => require(['../components/page/DeviceManage.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/devicemodule',
                    name: '/devicemodule',
                    component: resolve => require(['../components/page/DeviceModule.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/accountmanage',
                    component: resolve => require(['../components/page/AccountManage.vue'], resolve)
                },
                {
                    path: '/RomAppsScriptManage',
                    component: resolve => require(['../components/page/RomAppsScriptManage.vue'], resolve)
                },
                {
                    path: '/RomAppsScriptPush',
                    component: resolve => require(['../components/page/RomAppsScriptPush.vue'], resolve)
                },
                {
                    path: '/devtypemanage',
                    component: resolve => require(['../components/page/DeviceTypeManage.vue'], resolve)
                },
                {
                    path: '/pushresultdetail',
                    component: resolve => require(['../components/page/PushResultDetail.vue'], resolve)
                },
                {
                    path: '/GatewayRemoteCommand',
                    component: resolve => require(['../components/page/GatewayRemoteCommand.vue'], resolve)
                },
                {
                    path: '/ShowGatewayConfig',
                    name: '/ShowGatewayConfig',
                    component: resolve => require(['../components/page/ShowGatewayConfig.vue'], resolve)
                },
                {
                    path: '/ShowTriggerConfig',
                    name: '/ShowTriggerConfig',
                    component: resolve => require(['../components/page/ShowTriggerConfig.vue'], resolve)
                },
                {
                    path: '/ShowAlarmLogs',
                    name: '/ShowAlarmLogs',
                    component: resolve => require(['../components/page/ShowAlarmRunLogs.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            name: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/register',
            name: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '/charts',
            name: '/charts',
            component: resolve => require(['../components/page/BaseCharts.vue'], resolve)
        },
    
        {
            path: '*', // 页面不存在的情况下
            redirect: '/login',
         
          }
    ]
  
const router = new Router({
   mode: 'hash',
   base:process.env.BASE_URL,

   routes
  })


export default router
