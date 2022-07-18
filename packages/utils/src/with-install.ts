import { App, Plugin } from "vue";
export function withInstall<T>(cmp: T) {
  (cmp as T & Plugin).install = function (app: App) {
    app.component((cmp as any).name, cmp);
  };
  return cmp as T & Plugin;
}
