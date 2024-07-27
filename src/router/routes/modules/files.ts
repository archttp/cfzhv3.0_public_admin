import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/files',
  name: 'Files',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.file',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'fileManageList',
      name: 'FileManageList',
      component: () => import('@/views/files/fileManageList/index.vue'),
      meta: {
        locale: 'menu.file.manage.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'filePlatformList',
      name: 'FilePlatformList',
      component: () => import('@/views/files/filePlatformList/index.vue'),
      meta: {
        locale: 'menu.file.platformList',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default DASHBOARD;
