import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localPark from '@/views/park/locale/en-US';
import localParkVip from '@/views/parkingVip/locale/en-US';
import localUser from '@/views/user/locale/en-US';
import localeSettings from './en-US/settings';
import analysis from '@/views/visualization/multi-dimension-data-analysis/locale/en-US'

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',

  'menu.park': 'Park',
  'menu.park.list': 'ParkList',
  'menu.parkVip': 'Set meal',
  'menu.park.title': 'parking chang',
  'menu.parkVip.list': 'Set meal List',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localPark,
  ...localParkVip,
  ...localUser,
  ...analysis,
};
