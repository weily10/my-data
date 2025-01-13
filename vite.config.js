import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  
  return {
    plugins: [vue()],
    base: "/",
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
    },
  };
});
