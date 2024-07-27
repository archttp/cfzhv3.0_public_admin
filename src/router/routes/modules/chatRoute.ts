import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/chat',
  name: 'Chat',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.chat',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'messageList',
      name: 'MessageList',
      component: () => import('@/views/chatView/messageView/index.vue'),
      meta: {
        locale: 'menu.chat.message',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'notcieConfigList',
      name: 'NotcieConfigList',
      component: () => import('@/views/chatView/notcieConfigList/index.vue'),
      meta: {
        locale: 'menu.chat.message.NotcieConfigList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
