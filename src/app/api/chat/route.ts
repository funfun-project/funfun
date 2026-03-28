import { NextRequest } from 'next/server';

type Role = 'user' | 'assistant';

type ChatMessageDTO = {
  role: Role;
  content: string;
};

type ChatRequestBody = {
  messages: ChatMessageDTO[];
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isChatMessageDTO(value: unknown): value is ChatMessageDTO {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (obj.role === 'user' || obj.role === 'assistant') && typeof obj.content === 'string';
}

function isChatRequestBody(value: unknown): value is ChatRequestBody {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return Array.isArray(obj.messages) && obj.messages.every((message) => isChatMessageDTO(message));
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const rawBody: unknown = await request.json();

    if (!isChatRequestBody(rawBody)) {
      return new Response('잘못된 요청 형식입니다.', { status: 400 });
    }

    const body = rawBody;
    const messages = body.messages;

    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user');

    const prompt = lastUserMessage?.content ?? '';

    await sleep(1500);

    if (prompt.toLowerCase().includes('fail')) {
      return new Response('강제 실패 테스트', { status: 500 });
    }

    const answer =
      `당신이 보낸 메시지는: "${prompt}"\n\n` +
      `이 코드는 테스트용 API이며, 실제 LLM 대신 고정된 응답을 반환합니다.`;

    return new Response(answer, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new Response('잘못된 요청입니다.', { status: 400 });
  }
}
