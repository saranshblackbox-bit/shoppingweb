import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {nextHandler} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [googleAI(), nextHandler()],
  enableTracingAndMetrics: true,
});
