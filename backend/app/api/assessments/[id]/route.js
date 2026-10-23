import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// DELETE /api/assessments/[id] - Delete an assessment record
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.assessment.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Assessment deleted successfully' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error deleting assessment:', error);
    return NextResponse.json(
      { error: 'Failed to delete assessment', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
