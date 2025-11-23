import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {next} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [googleAI(), next({
    api: '/api/genkit',
  })],
  model: 'googleai/gemini-2.5-flash',
});
