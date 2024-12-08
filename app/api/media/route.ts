import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const perPageParam = searchParams.get("perPage");

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const perPage = perPageParam ? parseInt(perPageParam, 10) : 10;

    // Validate pagination parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: 'Invalid "page" parameter. Must be an integer >= 1.' },
        { status: 400 }
      );
    }
    if (isNaN(perPage) || perPage < 1) {
      return NextResponse.json(
        { error: 'Invalid "perPage" parameter. Must be an integer >= 1.' },
        { status: 400 }
      );
    }

    // Count total items for pagination info
    const totalItems = await prisma.media.count();
    const totalPages = Math.ceil(totalItems / perPage);

    // If requested page is larger than total pages, return empty results
    if (page > totalPages && totalPages > 0) {
      return NextResponse.json({
        items: [],
        page,
        perPage,
        totalItems,
        totalPages,
      });
    }

    // Fetch items for the current page
    const items = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json({
      items,
      page,
      perPage,
      totalItems,
      totalPages,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
