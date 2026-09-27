// ANTICRO CR-1 — Vite Server API Plugin for Google Gemini AI
// Mounts secure server-side endpoints on /api/ai/* without client-side key exposure.

import { 
  analyzeDevelopmentRequest, 
  synthesizeHotspot, 
  analyzeDemandHotspot, 
  analyzePriorityRecommendation, 
  analyzeEvidenceAssistance,
  getGeminiApiKey 
} from './geminiService.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

export function geminiApiPlugin() {
  return {
    name: 'anticro-gemini-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Health / Status check endpoint
        if (req.url === '/api/ai/status' && req.method === 'GET') {
          const key = getGeminiApiKey();
          const hasKey = Boolean(key);

          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({
            status: 'online',
            service: 'ANTICRO Gemini AI Intelligence Engine',
            geminiConfigured: hasKey,
            model: 'gemini-2.5-flash / gemini-1.5-flash'
          }));
          return;
        }

        // Real Gemini AI analysis endpoint
        if (req.url === '/api/ai/analyze-development-request' && req.method === 'POST') {
          let body = '';

          req.on('data', chunk => {
            body += chunk;
            // Prevent oversized payload attack
            if (body.length > 1e6) {
              req.destroy();
            }
          });

          req.on('end', async () => {
            try {
              const input = JSON.parse(body || '{}');
              const result = await analyzeDevelopmentRequest(input);

              res.setHeader('Content-Type', 'application/json');
              
              if (!result.success) {
                if (result.code === 'CONFIG_REQUIRED') {
                  res.statusCode = 503;
                } else if (result.code === 'INVALID_INPUT') {
                  res.statusCode = 400;
                } else {
                  res.statusCode = 500;
                }
              } else {
                res.statusCode = 200;
              }

              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                code: 'MALFORMED_REQUEST',
                message: 'Invalid JSON request payload.'
              }));
            }
          });
          return;
        }

        // Hotspot synthesis endpoint (Step 5L)
        if (req.url === '/api/ai/synthesize-hotspot' && req.method === 'POST') {
          let body = '';

          req.on('data', chunk => {
            body += chunk;
            if (body.length > 1e6) req.destroy();
          });

          req.on('end', async () => {
            try {
              const input = JSON.parse(body || '{}');
              const result = await synthesizeHotspot(input);

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                code: 'MALFORMED_REQUEST',
                message: 'Invalid JSON request payload.'
              }));
            }
          });
          return;
        }

        // Hotspot deep analysis endpoint (Step 5)
        if (req.url === '/api/ai/analyze-demand-hotspot' && req.method === 'POST') {
          let body = '';

          req.on('data', chunk => {
            body += chunk;
            if (body.length > 1e6) req.destroy();
          });

          req.on('end', async () => {
            try {
              const input = JSON.parse(body || '{}');
              const result = await analyzeDemandHotspot(input);

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                code: 'MALFORMED_REQUEST',
                message: 'Invalid JSON request payload.'
              }));
            }
          });
          return;
        }

        // Priority recommendation synthesis endpoint (Step 6)
        if (req.url === '/api/ai/analyze-priority' && req.method === 'POST') {
          let body = '';

          req.on('data', chunk => {
            body += chunk;
            if (body.length > 1e6) req.destroy();
          });

          req.on('end', async () => {
            try {
              const input = JSON.parse(body || '{}');
              const result = await analyzePriorityRecommendation(input);

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                code: 'MALFORMED_REQUEST',
                message: 'Invalid JSON request payload.'
              }));
            }
          });
          return;
        }

        // Step 7: Evidence analysis endpoint
        if (req.url === '/api/ai/analyze-evidence' && req.method === 'POST') {
          let body = '';

          req.on('data', chunk => {
            body += chunk;
            if (body.length > 1e6) req.destroy();
          });

          req.on('end', async () => {
            try {
              const input = JSON.parse(body || '{}');
              const result = await analyzeEvidenceAssistance(input);

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                code: 'MALFORMED_REQUEST',
                message: 'Invalid JSON request payload.'
              }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}
