import {App} from "vue";

import {
    ConfigProvider,
    Button,
    AutoComplete,
    Input,
} from "ant-design-vue";

export function RegisterComponents(app: App<Element>): App<Element> {

    app.use(Button);
    app.use(ConfigProvider);
    app.use(AutoComplete);
    app.use(Input);

    return app;
}