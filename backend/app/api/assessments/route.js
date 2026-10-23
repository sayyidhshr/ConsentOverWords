import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

// GET /api/assessments - Daftar responden (khusus admin)
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: { timestamp: 'desc' },
    });

    return NextResponse.json(assessments, { status: 200 });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    );
  }
}

// POST /api/assessments - Simpan hasil kuis (publik)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      participantId,
      name,
      institution,
      email,
      role,
      mode,
      score,
      total,
      percentage,
      answers,
      timestamp,
    } = body;

    const newAssessment = await prisma.assessment.create({
      data: {
        participantId: participantId || null,
        name: name ? String(name).trim().slice(0, 150) : 'Anonim',
        institution: institution ? String(institution).trim().slice(0, 150) : 'Umum',
        email: email ? String(email).trim().slice(0, 150) : '',
        role: role ? String(role).slice(0, 100) : 'Mahasiswa',
        mode: mode === 'post' ? 'post' : 'pre',
        score: Number(score) || 0,
        total: Number(total) || 10,
        percentage: Number(percentage) || 0,
        answers: answers || null,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
      select: { id: true },
    });

    return NextResponse.json({ success: true, id: newAssessment.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving assessment:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan hasil asesmen ke database' },
      { status: 500 }
    );
  }
}