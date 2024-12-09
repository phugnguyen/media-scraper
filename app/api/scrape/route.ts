import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { load } from "cheerio";
import { Element } from "domhandler"; // Import Element type from domhandler

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
    }

    // Fetch the HTML content from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${url}` },
        { status: 500 }
      );
    }

    const html = await response.text();
    const $ = load(html);

    // Convert attributes to both a JSON object and a string
    const getAttributes = (el: Element) => {
      const attribs = el.attribs || {};
      const attributesString = Object.entries(attribs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");

      return { attributesObject: attribs, attributesString };
    };

    // Extract images
    const images = $("img")
      .map((_, el: Element) => {
        const src = el.attribs?.src;
        if (!src) return null;

        const fullUrl = new URL(src, url).href;
        const { attributesObject, attributesString } = getAttributes(el);

        return {
          url: fullUrl,
          type: "image",
          metadata: { attributes: attributesObject },
          metadataText: attributesString,
        };
      })
      .get()
      .filter(Boolean);

    // Extract videos
    const videos = $("video")
      .map((_, el: Element) => {
        let videoUrl = el.attribs?.src;
        if (!videoUrl) {
          // Check <source> if no direct src on <video>
          const source = $(el).find("source").attr("src");
          if (source) {
            videoUrl = source;
          } else {
            return null;
          }
        }

        const fullUrl = new URL(videoUrl!, url).href;
        const { attributesObject, attributesString } = getAttributes(el);

        return {
          url: fullUrl,
          type: "video",
          metadata: { attributes: attributesObject },
          metadataText: attributesString,
        };
      })
      .get()
      .filter(Boolean);

    const mediaItems = [...images, ...videos];

    // Insert results into the database
    const createdMedia = await prisma.media.createMany({
      data: mediaItems.map((item) => ({
        url: item.url,
        type: item.type,
        metadata: item.metadata,
        metadataText: item.metadataText,
        originUrl: url,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      createdCount: createdMedia.count,
      items: mediaItems,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
