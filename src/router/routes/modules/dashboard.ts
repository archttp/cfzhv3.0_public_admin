import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'parkingDataCount',
      name: 'ParkingDataCount',
      component: () => import('@/views/visualization/parkingDataCount/index.vue'),
      meta: {
        locale: 'menu.dashboard.parkingDataCount',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'chargingDataCount',
      name: 'ChargingDataCount',
      component: () => import('@/views/visualization/chargingDataCount/index.vue'),
      meta: {
        locale: 'menu.dashboard.chargingDataCount',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'villageDataCount',
      name: 'VillageDataCount',
      component: () => import('@/views/visualization/villageDataCount/index.vue'),
      meta: {
        locale: 'menu.dashboard.villageDataCount',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
