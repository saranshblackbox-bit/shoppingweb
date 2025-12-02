'use server';

import {genkit, type Plugin} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {genkitEval} from 'genkitx-eval';
import {dotprompt} from 'genkitx-dotprompt';

const plugins: Plugin<any>[] = [
  dotprompt(),
  genkitEval(),
];

if (process.env.GEMINI_API_KEY) {
  plugins.push(googleAI({apiVersion: 'v1beta'}));
}

export const ai = genkit({
  plugins,
  enableTracingAndMetrics: true,
  logLevel: 'debug',
});
