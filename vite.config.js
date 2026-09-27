import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { geminiApiPlugin } from './server/apiPlugin.js'
import dotenv from 'dotenv'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load .env explicitly with override so any process-level caching is bypassed
  dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY && env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }

  return {
    plugins: [
      react(),
      geminiApiPlugin()
    ],
    server: {
      port: 5173,
      host: true
    }
  };
})

