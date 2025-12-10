import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// リポジトリ名を設定してください（例: 'darts-checkout-master'）
// 🚨 nakasatoryuiti/darts-checkout-master の場合、リポジトリ名は 'darts-checkout-master' です。
const REPO_NAME = 'darts-checkout-master'; 

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    return {
      // 🚨 GitHub Pages デプロイのために base パスを設定
      // 例: base: '/darts-checkout-master/', となります。
      base: `/${REPO_NAME}/`,
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // (もし必要であれば) build設定を追加
      build: {
        outDir: 'dist',
      }
    };
});
