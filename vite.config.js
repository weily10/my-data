import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({


  plugins: [vue(),
    createHtmlPlugin({
      inject: {
        data: {
          title: process.env.VITE_APP_TITLE || 'Default Title',
        },
      },
    })],
  base: env.VITE_APP_BASE || "/",
  server: {
    watch: {
      usePolling: true,
    }
    // proxy: {
    //   "/apiPlatform/": {
    //     target: "http://10.201.201.22:8080",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/apiPlatform/, "/api/"),
    //   },
    //   "/api/": {
    //     target: "http://10.201.201.22:8081",
    //   },
    //   // '/api-dp2/': 'http://10.201.201.22:8082',
    //   // '/api-dp3/': 'http://10.201.201.22:8083',
    // },
  }
});
