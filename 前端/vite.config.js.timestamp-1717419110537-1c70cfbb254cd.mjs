// vite.config.js
import { defineConfig } from "file:///E:/homework/MachineLearn/stock_predict/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/homework/MachineLearn/stock_predict/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/homework/MachineLearn/stock_predict/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createStyleImportPlugin } from "file:///E:/homework/MachineLearn/stock_predict/node_modules/vite-plugin-style-import/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          }
        }
      ]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxob21ld29ya1xcXFxNYWNoaW5lTGVhcm5cXFxcc3RvY2tfcHJlZGljdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcaG9tZXdvcmtcXFxcTWFjaGluZUxlYXJuXFxcXHN0b2NrX3ByZWRpY3RcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2hvbWV3b3JrL01hY2hpbmVMZWFybi9zdG9ja19wcmVkaWN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XG4gICAgICBsaWJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaWJyYXJ5TmFtZTogJ2VsZW1lbnQtcGx1cycsXG4gICAgICAgICAgZXNNb2R1bGU6IHRydWUsXG4gICAgICAgICAgZW5zdXJlU3R5bGVGaWxlOiB0cnVlLFxuICAgICAgICAgIHJlc29sdmVTdHlsZTogKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgZWxlbWVudC1wbHVzL2xpYi90aGVtZS1jaGFsay8ke25hbWV9LmNzc2BcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc29sdmVDb21wb25lbnQ6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGVsZW1lbnQtcGx1cy9saWIvJHtuYW1lfWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KVxuICBdXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0UyxTQUFTLG9CQUFvQjtBQUN6VSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsK0JBQStCO0FBRXhDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLHdCQUF3QjtBQUFBLE1BQ3RCLE1BQU07QUFBQSxRQUNKO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsVUFDVixpQkFBaUI7QUFBQSxVQUNqQixjQUFjLENBQUMsU0FBUztBQUN0QixtQkFBTyxnQ0FBZ0MsSUFBSTtBQUFBLFVBQzdDO0FBQUEsVUFDQSxrQkFBa0IsQ0FBQyxTQUFTO0FBQzFCLG1CQUFPLG9CQUFvQixJQUFJO0FBQUEsVUFDakM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
