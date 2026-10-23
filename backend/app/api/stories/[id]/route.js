import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET /api/stories/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const story = await prisma.story.findUnique({
      where: { id },
    });

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(story, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch story', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PATCH /api/stories/[id] - Update story (e.g. status moderation, category, resonance)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, category, resonanceCount } = body;

    const dataToUpdate = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (category !== undefined) dataToUpdate.category = category;
    if (resonanceCount !== undefined) dataToUpdate.resonanceCount = resonanceCount;

    const updatedStory = await prisma.story.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedStory, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json(
      { error: 'Failed to update story', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE /api/stories/[id] - Delete story
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.story.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Story deleted successfully' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error deleting story:', error);
    return NextResponse.json(
      { error: 'Failed to delete story', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
