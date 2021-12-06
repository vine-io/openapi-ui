import type { App } from 'vue';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
  Collapse,
  Tabs,
  Divider,
  Table,
  Checkbox,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Collapse)
    .use(Tabs)
    .use(Divider)
    .use(Table)
    .use(Checkbox);
}
