import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';
import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localPark from '@/views/park/locale/zh-CN';
import localParkVip from '@/views/parkingVip/locale/zh-CN';
import localUser from '@/views/user/locale/zh-CN';
import localPay from '@/views/pay/locale/zh-CN';
import verification from '@/views/verification/locale/zh-CN';
import files from '@/views/files/locale/zh-CN';
import wisdomCommunity from '@/views/wisdomCommunity/locale/zh-CN';
import localInternetOfThings from '@/views/internet_of_things/locale/zh-CN';
import localChat from '@/views/chatView/locale/zh-CN';
import localeSettings from './zh-CN/settings';
import analysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN'
import parkingDataCount from '@/views/visualization/parkingDataCount/locale/zh-CN'

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'menu.park': '停车',
  'menu.park.list': '列表',
  'menu.parkVip': '套餐',
  'menu.parkVip.list': '列表',
  'menu.park.title': '停车场',
  'menu.parkVip.packageType': '产品',
  'menu.ucenter.systemConfig.list': '系统配置管理',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localPark,
  ...localParkVip,
  ...localUser,
  ...localPay,
  ...localInternetOfThings,
  ...verification,
  ...wisdomCommunity,
  ...analysis,
  ...localChat,
  ...parkingDataCount,
  ...files,
};
