import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/park',
  name: 'Park',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.park',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'carparkList',
      name: 'CarparkList',
      component: () => import('@/views/park/list/index.vue'),
      meta: {
        locale: 'menu.park.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'carparkLog',
      name: 'CarparkLog',
      component: () => import('@/views/park/parkingRecord/index.vue'),
      meta: {
        locale: 'menu.park.parkingRecord',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
