import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    // Test DB connection with a simple query
    await prisma.$queryRaw`SELECT 1`;
    const storyCount = await prisma.story.count();
    const assessmentCount = await prisma.assessment.count();

    return NextResponse.json(
      {
        status: 'ok',
        database: 'connected',
        dialect: 'MySQL',
        counts: {
          stories: storyCount,
          assessments: assessmentCount,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503, headers: corsHeaders }
    );
  }
}
