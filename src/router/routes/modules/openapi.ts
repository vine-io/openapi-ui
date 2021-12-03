import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const openAPI: AppRouteModule = {
  path: '/openapi',
  name: 'OpenAPI',
  component: LAYOUT,
  redirect: '/openapi/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:rocket-filled',
    title: t('routes.openapi.openapi'),
    orderNo: 20,
  },
  children: [
    {
      path: 'index',
      name: 'OpenAPIPage',
      component: () => import('/@/views/openapi/index.vue'),
      meta: {
        title: t('routes.openapi.openapi'),
        icon: 'ant-design:rocket-filled',
        hideMenu: true,
      },
    },
  ],
};

export default openAPI;
