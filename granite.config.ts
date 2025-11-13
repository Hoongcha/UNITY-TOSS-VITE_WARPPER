import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: '', // 토스에서 설정한 앱이름
  brand: {
    displayName: '', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: '', // 아이콘 URL
    bridgeColorMode: 'inverted',
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'tsc -b && vite build',
    },
  },
  webViewProps: {
    type: 'game'
  },
  permissions: [],
  outdir: 'dist',
});
