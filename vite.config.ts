import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 1. ย้าย base มาไว้ตรงนี้ (นอกสุด) และตั้งค่าเป็น './' หรือว่างไว้ 
    // เพื่อให้ทำงานร่วมกับ viteSingleFile บน GitHub Pages ได้อย่างถูกต้อง
    base: './', 
    
    plugins: [react(), tailwindcss(), viteSingleFile()],
    
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // ❌ ลบ base: '/E.i.p.r.w/', ออกจากตรงนี้แล้ว
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 100000000,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});