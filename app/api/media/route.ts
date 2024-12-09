import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const perPageParam = searchParams.get("perPage");
    const q = searchParams.get("q") || "";
    const typeParam = searchParams.get("type") || "";

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

    // Build a where clause dynamically based on q and typeParam
    let where: any = {};

    // If q is provided, we create an OR condition for searching text fields
    const searchConditions = q
      ? [
          { url: { contains: q, mode: "insensitive" } },
          { type: { contains: q, mode: "insensitive" } },
          { originUrl: { contains: q, mode: "insensitive" } },
          { metadataText: { contains: q, mode: "insensitive" } },
        ]
      : [];

    if (typeParam && q) {
      // If both type and q are provided, filter by type and also search other fields
      where = {
        type: typeParam,
        OR: searchConditions,
      };
    } else if (typeParam && !q) {
      // If only type is provided, filter by type
      where = { type: typeParam };
    } else if (!typeParam && q) {
      // If only q is provided, filter by text search on multiple fields
      where = { OR: searchConditions };
    } else {
      // Neither q nor type provided, no additional filters
      where = {};
    }

    // Count total items
    const totalItems = await prisma.media.count({ where });
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
      where,
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
