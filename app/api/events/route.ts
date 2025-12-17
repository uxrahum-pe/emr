/**
 * 사용자 이벤트 로깅 API
 * 클라이언트에서 발생한 이벤트를 배치로 저장
 *
 * TODO: DB 준비 후 주석 해제
 */

import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  // TODO: DB 준비 후 주석 해제
  return NextResponse.json(
    { success: false, error: "Event logging is disabled. Database not ready." },
    { status: 503 }
  );

  /* DB 준비 후 주석 해제
  try {
    const body = await request.json();
    const { sessionId, userId, pagePath, events, eventCount } = body;

    if (
      !sessionId ||
      !pagePath ||
      !Array.isArray(events) ||
      events.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid request data" },
        { status: 400 }
      );
    }

    await prisma.userEventBatch.create({
      data: {
        sessionId,
        userId: userId || null,
        pagePath,
        events: events,
        eventCount: eventCount || events.length,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("이벤트 저장 실패:", errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save events",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
  */
}
