import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST /api/stories/[id]/resonate
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const action = body.action || 'increment'; // 'increment' or 'decrement'

    const existing = await prisma.story.findUnique({
      where: { id },
      select: { resonanceCount: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    const newCount =
      action === 'decrement'
        ? Math.max(0, existing.resonanceCount - 1)
        : existing.resonanceCount + 1;

    const updated = await prisma.story.update({
      where: { id },
      data: { resonanceCount: newCount },
    });

    return NextResponse.json(updated, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error updating resonance:', error);
    return NextResponse.json(
      { error: 'Failed to update resonance', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
