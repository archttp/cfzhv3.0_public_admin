import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/internetOfThings',
  name: 'InternetOfThings',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.park',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'internetofthingsCarParkList',
      name: 'InternetofthingsCarParkList',
      component: () =>
        import('@/views/internet_of_things/carParkList/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carpark.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsCarParkCar',
      name: 'InternetofthingsCarParkCar',
      component: () =>
        import('@/views/internet_of_things/licensePlateBind/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carparkcar',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsCarType',
      name: 'InternetofthingsCarType',
      component: () =>
        import('@/views/internet_of_things/carType/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.cartype',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsCarParkUseLog',
      name: 'InternetofthingsCarParkUseLog',
      component: () =>
        import('@/views/internet_of_things/parkingRecords/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carparkuselog',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsPackageProduct',
      name: 'InternetofthingsPackageProduct',
      component: () =>
        import('@/views/internet_of_things/packageProduct/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.packageproduct',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsPackage',
      name: 'InternetofthingsPackage',
      component: () =>
        import('@/views/internet_of_things/packageList/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.package',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsSpecialCar',
      name: 'InternetofthingsSpecialCar',
      component: () =>
        import('@/views/internet_of_things/specialCar/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.specialcar',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsCarParkLimit',
      name: 'InternetofthingsCarParkLimit',
      component: () =>
        import('@/views/internet_of_things/carParkLimit/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carparklimit',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsChargingList',
      name: 'InternetofthingsChargingList',
      component: () =>
        import('@/views/internet_of_things/chargingStation/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.charging.stationlist',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'internetofthingsChargingUseLog',
      name: 'InternetofthingsChargingUseLog',
      component: () =>
        import('@/views/internet_of_things/charginRecords/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.charging.uselog',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'carParkDataReportingPlatformList',
      name: 'CarParkDataReportingPlatformList',
      component: () =>
        import('@/views/internet_of_things/carParkDataReportingPlatformList/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carpark.DataReportingPlatformList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'storedCard',
      name: 'StoredCard',
      component: () =>
        import('@/views/internet_of_things/storedCard/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carpark.storedCardList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'chargingStoredCard',
      name: 'ChargingStoredCard',
      component: () =>
        import('@/views/internet_of_things/chargingStoredCard/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carpark.storedCardList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'carParkVisit',
      name: 'CarParkVisit',
      component: () =>
        import('@/views/internet_of_things/parkVisit/index.vue'),
      meta: {
        locale: 'menu.pay.internetofthings.carpark.carParkVisitList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
