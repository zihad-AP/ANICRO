import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const testModels = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-flash-latest'
];

async function checkModels() {
  for (const model of testModels) {
    try {
      console.log(`Checking ${model}...`);
      const res = await ai.models.generateContent({
        model,
        contents: 'Say hello in one word'
      });
      console.log(`✓ SUCCESS [${model}]:`, res.text ? (typeof res.text === 'function' ? res.text() : res.text).trim() : 'No text');
    } catch (e) {
      console.log(`✗ FAIL [${model}]:`, e.message);
    }
  }
}

checkModels();
