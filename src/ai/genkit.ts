import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {nextPlugin} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [googleAI(), nextPlugin({
    api: '/api/genkit',
  })],
  model: 'googleai/gemini-2.5-flash',
});
