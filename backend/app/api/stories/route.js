import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper for CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET /api/stories - List stories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const stories = await prisma.story.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(stories, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories from database', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST /api/stories - Create new story from user input (pesan, informasi, kategori)
export async function POST(request) {
  try {
    const body = await request.json();
    const { category, storyText, feeling, consentToPublish } = body;

    // Validation
    if (!storyText || storyText.trim().length < 10) {
      return NextResponse.json(
        { error: 'Pesan / cerita pengalaman minimal 10 karakter.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Kategori wajib dipilih.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Save story to MySQL database
    const newStory = await prisma.story.create({
      data: {
        category: category.trim(),
        storyText: storyText.trim(),
        feeling: feeling ? feeling.trim() : 'Uncomfortable',
        date: new Date(),
        status: 'pending', // Moderation required
        resonanceCount: 0,
        consentToPublish: Boolean(consentToPublish),
      },
    });

    return NextResponse.json(newStory, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan cerita ke database', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
