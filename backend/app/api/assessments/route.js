import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET /api/assessments - List all assessments for admin dashboard
export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });

    return NextResponse.json(assessments, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessments', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST /api/assessments - Save awareness quiz result to database
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
        name: name ? name.trim() : 'Anonim',
        institution: institution ? institution.trim() : 'Umum',
        email: email ? email.trim() : '',
        role: role || 'Mahasiswa',
        mode: mode || 'pre',
        score: Number(score) || 0,
        total: Number(total) || 10,
        percentage: Number(percentage) || 0,
        answers: answers || null,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
    });

    return NextResponse.json(newAssessment, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('Error saving assessment:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan hasil asesmen ke database', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
