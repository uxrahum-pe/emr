"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initEventLogger,
  getEventLogger,
  destroyEventLogger,
} from "@/lib/event-logger";

/**
 * 사용자 이벤트 로깅 훅
 * 컴포넌트에서 사용하여 자동으로 이벤트 추적
 */
export function useEventLogger(userId?: string) {
  const pathname = usePathname();

  useEffect(() => {
    // 이벤트 로거 초기화
    initEventLogger(userId);

    const logger = getEventLogger();
    logger.updatePath(pathname);

    // 컴포넌트 언마운트 시 정리
    return () => {
      // 페이지 변경 시에만 플러시 (완전 종료가 아닌 경우)
      logger.flush();
    };
  }, [userId, pathname]);

  // 앱 전체 종료 시 정리
  useEffect(() => {
    return () => {
      destroyEventLogger();
    };
  }, []);
}
