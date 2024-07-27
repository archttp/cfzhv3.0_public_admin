import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/wisdomCommunity',
  name: 'WisdomCommunity',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.wisdomcommunity',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'villageList',
      name: 'VillageList',
      component: () => import('@/views/wisdomCommunity/villageList/index.vue'),
      meta: {
        locale: 'menu.wisdomcommunity.village.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'villageResidentList',
      name: 'VillageResidentList',
      component: () =>
        import('@/views/wisdomCommunity/villageResidentList/index.vue'),
      meta: {
        locale: 'menu.wisdomcommunity.villageresident.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'villageResidentVisitingRecords',
      name: 'VillageResidentVisitingRecords',
      component: () =>
        import(
          '@/views/wisdomCommunity/villageResidentVisitingRecords/index.vue'
        ),
      meta: {
        locale: 'menu.wisdomcommunity.villageresidentvisitingrecords.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'villageBuilding',
      name: 'VillageBuilding',
      component: () =>
        import('@/views/wisdomCommunity/villageBuilding/index.vue'),
      meta: {
        locale: 'menu.wisdomcommunity.building.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'villageAppointmentVisitRecord',
      name: 'VillageAppointmentVisitRecord',
      component: () =>
        import(
          '@/views/wisdomCommunity/villageAppointmentVisitRecord/index.vue'
        ),
      meta: {
        locale: 'menu.wisdomcommunity.villageappointmentvisitrecord.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'buildingHousehold',
      name: 'BuildingHousehold',
      component: () =>
        import('@/views/wisdomCommunity/buildingHousehold/index.vue'),
      meta: {
        locale: 'menu.wisdomcommunity.village.household',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
