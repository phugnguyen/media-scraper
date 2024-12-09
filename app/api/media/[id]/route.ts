import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID format." }, { status: 400 });
  }

  try {
    // Fetch the media record by ID
    const media = await prisma.media.findUnique({
      where: {
        id: Number(id),
      },
    });

    // If no media is found
    if (!media) {
      return NextResponse.json({ error: "Media not found." }, { status: 404 });
    }

    // Return the media record
    return NextResponse.json(media, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
