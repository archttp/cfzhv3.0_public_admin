import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/parkVip',
  name: 'ParkVip',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.parkVip',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'vipList',
      name: 'VipList',
      component: () => import('@/views/parkingVip/list/index.vue'),
      meta: {
        locale: 'menu.parkVip.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'packageType',
      name: 'PackageType',
      component: () => import('@/views/parkingVip/packageType/index.vue'),
      meta: {
        locale: 'menu.parkVip.packageType',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
