import { NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1373945412645421076/dvFPzOeSVvcmthxMiflGWMhdLblpWemZBFkKMjLwF0qA0Vk3SqqO7PgxoFcfIn1gBXZ-';

export async function POST(request: Request) {
  try {
    const { key, username } = await request.json();

    // Send only the key and username to Discord
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New registration key: ${key} (Username: ${username})`
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send webhook');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
} 