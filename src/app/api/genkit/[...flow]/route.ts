'use server';

import { chatWithSupport } from '@/ai/flows/ai-chatbot-support';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { flow: string[] } }
) {
  const flowId = params.flow.join('/');
  
  if (flowId === 'chatWithSupportFlow') {
    try {
      const body = await req.json();
      if (!body.message) {
        return NextResponse.json(
          { error: 'Message is required' },
          { status: 400 }
        );
      }

      const response = await chatWithSupport({ message: body.message });
      return NextResponse.json(response);
    } catch (error: any) {
      console.error('Error in chat handler:', error);
      return NextResponse.json(
        {
          error: 'An error occurred processing your request.',
          details: error.message,
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
}
