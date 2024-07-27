import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/pay',
  name: 'Pay',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.pay',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'payOrderList',
      name: 'PayOrderList',
      component: () => import('@/views/pay/list/index.vue'),
      meta: {
        locale: 'menu.pay.order.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'userPaymentAgencyList',
      name: 'UserPaymentAgencyList',
      component: () => import('@/views/pay/userPaymentAgency/index.vue'),
      meta: {
        locale: 'menu.pay.userPaymentAgency.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'scoreTypeList',
      name: 'ScoreTypeList',
      component: () => import('@/views/pay/scoreType/index.vue'),
      meta: {
        locale: 'menu.scoretype.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'accountList',
      name: 'AccountList',
      component: () => import('@/views/pay/account/index.vue'),
      meta: {
        locale: 'menu.account.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'weChatMerchantApplicationList',
      name: 'WeChatMerchantApplicationList',
      component: () => import('@/views/pay/serviceProvider/index.vue'),
      meta: {
        locale: 'menu.pay.userPaymentAgency.wechatmerchantapplicationlist',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'couponList',
      name: 'CouponList',
      component: () => import('@/views/pay/couponList/index.vue'),
      meta: {
        locale: 'menu.pay.coupon.couponlist',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'couponActivityLis',
      name: 'CouponActivityLis',
      component: () => import('@/views/pay/couponActivityLis/index.vue'),
      meta: {
        locale: 'menu.pay.coupon.activitylis',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'bankList',
      name: 'BankList',
      component: () => import('@/views/pay/bankList/index.vue'),
      meta: {
        locale: 'menu.pay.bank.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'bankBranchList',
      name: 'BankBranchList',
      component: () => import('@/views/pay/bankBranchList/index.vue'),
      meta: {
        locale: 'menu.pay.bank.bankBranchList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
