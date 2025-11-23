'use server';

import { chatWithSupport } from '@/ai/flows/ai-chatbot-support';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { flowId } = req.params as { flowId: string };
  const body = await req.json();

  if (flowId === 'chatWithSupportFlow') {
    try {
      if (!body.message) {
        return NextResponse.json({ error: 'Message is required' }, { status: 400 });
      }

      const response = await chatWithSupport({ message: body.message });
      return NextResponse.json(response);
    } catch (error: any) {
      console.error('Error in chat handler:', error);
      return NextResponse.json(
        { error: 'An error occurred processing your request.', details: error.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
}
