import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/verification',
  name: 'Verification',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.validation.sms',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'sms',
      name: 'Sms',
      component: () => import('@/views/verification/sms/index.vue'),
      meta: {
        locale: 'menu.validation.sms.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'smsConfig',
      name: 'SmsConfig',
      component: () => import('@/views/verification/smsConfig/index.vue'),
      meta: {
        locale: 'menu.validation.sms.config',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'faceVerifyList',
      name: 'FaceVerifyList',
      component: () => import('@/views/verification/faceList/index.vue'),
      meta: {
        locale: 'menu.validation.faceverify',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
