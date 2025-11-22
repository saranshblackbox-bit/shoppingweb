'use server';

/**
 * @fileOverview This file defines the AI chatbot support flow for the Bharat Bazaar application.
 *
 * - chatWithSupport - A function that initiates a conversation with the AI support chatbot.
 * - ChatWithSupportInput - The input type for the chatWithSupport function, representing user messages.
 * - ChatWithSupportOutput - The return type for the chatWithSupport function, representing the chatbot's responses.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithSupportInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type ChatWithSupportInput = z.infer<typeof ChatWithSupportInputSchema>;

const ChatWithSupportOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type ChatWithSupportOutput = z.infer<typeof ChatWithSupportOutputSchema>;

export async function chatWithSupport(input: ChatWithSupportInput): Promise<ChatWithSupportOutput> {
  return chatWithSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotSupportPrompt',
  input: {schema: ChatWithSupportInputSchema},
  output: {schema: ChatWithSupportOutputSchema},
  prompt: `You are a customer support chatbot for Bharat Bazaar, an e-commerce platform for Indian products.
  Your goal is to assist users with their questions and guide them through the platform.
  Be friendly, helpful, and concise in your responses.

  User message: {{{message}}}`,
});

const chatWithSupportFlow = ai.defineFlow(
  {
    name: 'chatWithSupportFlow',
    inputSchema: ChatWithSupportInputSchema,
    outputSchema: ChatWithSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
