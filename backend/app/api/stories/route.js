import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

// GET /api/stories - Daftar cerita
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const admin = await isAdmin();

    // Non-admin hanya boleh melihat cerita approved
    if (!admin && status && status !== 'approved') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const where = {};
    if (!admin) {
      where.status = 'approved'; 
    } else if (status && status !== 'all') {
      where.status = status;
    }

    const stories = await prisma.story.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories from database' },
      { status: 500 }
    );
  }
}

// POST /api/stories - Kirim cerita baru (publik)
export async function POST(request) {
  try {
    const body = await request.json();
    const { category, storyText, feeling, consentToPublish } = body;

    if (!storyText || storyText.trim().length < 10) {
      return NextResponse.json(
        { error: 'Pesan / cerita pengalaman minimal 10 karakter.' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json({ error: 'Kategori wajib dipilih.' }, { status: 400 });
    }

    const newStory = await prisma.story.create({
      data: {
        category: category.trim(),
        storyText: storyText.trim(),
        feeling: feeling ? feeling.trim() : 'Uncomfortable',
        date: new Date(),
        status: 'pending',
        resonanceCount: 0,
        consentToPublish: Boolean(consentToPublish),
      },
    });

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan cerita ke database' },
      { status: 500 }
    );
  }
}