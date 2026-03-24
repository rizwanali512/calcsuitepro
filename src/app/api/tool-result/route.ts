import { addResult } from '@/lib/result-storage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, input, output } = body as {
      slug?: string;
      input?: string;
      output?: string;
    };
    if (!slug || typeof input !== 'string' || typeof output !== 'string') {
      return NextResponse.json(
        { error: 'Missing slug, input, or output' },
        { status: 400 }
      );
    }
    const id = addResult(slug, input, output);
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}
