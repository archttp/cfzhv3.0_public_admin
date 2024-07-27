import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
    hideInMenu: false,
  },
  children: [
    {
      path: 'userList',
      name: 'UserList',
      component: () => import('@/views/user/list/index.vue'),
      meta: {
        locale: 'menu.ucenter.user.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'authorityList',
      name: 'AuthorityList',
      component: () => import('@/views/user/authority/index.vue'),
      meta: {
        locale: 'menu.user.authority',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'roleList',
      name: 'RoleList',
      component: () => import('@/views/user/roles/index.vue'),
      meta: {
        locale: 'menu.ucenter.role.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'departmentList',
      name: 'DepartmentList',
      component: () => import('@/views/user/department/index.vue'),
      meta: {
        locale: 'menu.ucenter.department.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'thirdPartyPlatformApplicationList',
      name: 'ThirdPartyPlatformApplicationList',
      component: () =>
        import('@/views/user/thirdpartyplatformapplication/index.vue'),
      meta: {
        locale: 'menu.ucenter.thirdpartyplatformapplication.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'systemConfigList',
      name: 'SystemConfigList',
      component: () => import('@/views/user/systemConfig/index.vue'),
      meta: {
        locale: 'menu.ucenter.systemConfig.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'idcardList',
      name: 'IdcardList',
      component: () => import('@/views/user/cfCertificate/index.vue'),
      meta: {
        locale: 'menu.ucenter.certificate.idcardlist',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'businessLicense',
      name: 'BusinessLicense',
      component: () => import('@/views/user/businessLicense/index.vue'),
      meta: {
        locale: 'menu.ucenter.certificate.businesslicenselist',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'userSetting',
      name: 'UserSetting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'userDriverLicenseList',
      name: 'UserDriverLicenseList',
      component: () => import('@/views/user/driverLicenseList/index.vue'),
      meta: {
        locale: 'menu.ucenter.certificate.driverlicenselist',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'qrcodeList',
      name: 'QrcodeList',
      component: () => import('@/views/user/qrcode/index.vue'),
      meta: {
        locale: 'menu.ucenter.qrcode.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'roleProductList',
      name: 'RoleProductList',
      component: () => import('@/views/user/roleProductList/index.vue'),
      meta: {
        locale: 'menu.ucenter.roleproduct.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'actionLog',
      name: 'ActionLog',
      component: () => import('@/views/user/actionLog/index.vue'),
      meta: {
        locale: 'menu.ucenter.user.actionLog.list',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'userDomain',
      name: 'UserDomain',
      component: () => import('@/views/user/userDomain/index.vue'),
      meta: {
        locale: 'menu.ucenter.user.domainlist',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
      path: 'adList',
      name: 'AdList',
      component: () => import('@/views/user/ad/index.vue'),
      meta: {
        locale: 'menu.ucenter.ad.adlist',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: false,
      },
    },
  ],
};

export default DASHBOARD;
