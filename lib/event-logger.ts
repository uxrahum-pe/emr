/**
 * 사용자 이벤트 로깅 시스템
 * 마우스 이동, 클릭 등의 사용자 인터랙션을 추적
 *
 * 성능 최적화를 위해 배치 처리 방식 사용
 * 클라이언트 사이드에서 실행되므로 API를 통해 저장
 */

// ============================================
// 타입 정의
// ============================================

export type EventType =
  | "mousemove"
  | "click"
  | "scroll"
  | "keydown"
  | "focus"
  | "blur";

export interface MouseEventData {
  x: number;
  y: number;
  target?: string; // element selector
  button?: number; // 0: left, 1: middle, 2: right
}

export interface ClickEventData extends MouseEventData {
  element?: string;
  text?: string;
}

export interface ScrollEventData {
  scrollX: number;
  scrollY: number;
  scrollHeight: number;
  scrollWidth: number;
}

export interface KeyboardEventData {
  key: string;
  code: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

export type EventData =
  | MouseEventData
  | ClickEventData
  | ScrollEventData
  | KeyboardEventData;

export interface QueuedEvent {
  type: EventType;
  data: EventData;
  timestamp: Date;
}

// ============================================
// 이벤트 큐 (배치 처리)
// ============================================

class EventLogger {
  private eventQueue: QueuedEvent[] = [];
  private batchSize = 50; // 배치 크기
  private flushInterval = 5000; // 5초마다 자동 플러시
  private flushTimer: NodeJS.Timeout | null = null;
  private sessionId: string;
  private userId: string | null = null;
  private currentPath: string = "";

  constructor() {
    this.sessionId = this.generateSessionId();
    this.currentPath =
      typeof window !== "undefined" ? window.location.pathname : "";
    this.startAutoFlush();
  }

  /**
   * 세션 ID 생성
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 사용자 ID 설정
   */
  setUserId(userId: string | null) {
    this.userId = userId;
  }

  /**
   * 현재 페이지 경로 업데이트
   */
  updatePath(path: string) {
    this.currentPath = path;
  }

  /**
   * 이벤트 큐에 추가
   */
  logEvent(type: EventType, data: EventData) {
    this.eventQueue.push({
      type,
      data,
      timestamp: new Date(),
    });

    // 배치 크기에 도달하면 즉시 플러시
    if (this.eventQueue.length >= this.batchSize) {
      this.flush();
    }
  }

  /**
   * 마우스 이동 이벤트 로깅 (throttled)
   */
  private mouseMoveThrottle: number | null = null;
  logMouseMove(x: number, y: number, target?: string) {
    // 마우스 이동은 너무 빈번하므로 throttling
    if (this.mouseMoveThrottle) {
      return;
    }

    this.mouseMoveThrottle = window.setTimeout(() => {
      this.logEvent("mousemove", { x, y, target });
      this.mouseMoveThrottle = null;
    }, 100); // 100ms마다 최대 1회
  }

  /**
   * 클릭 이벤트 로깅
   */
  logClick(
    x: number,
    y: number,
    element?: string,
    text?: string,
    button?: number
  ) {
    this.logEvent("click", { x, y, element, text, button });
  }

  /**
   * 스크롤 이벤트 로깅 (throttled)
   */
  private scrollThrottle: number | null = null;
  logScroll(
    scrollX: number,
    scrollY: number,
    scrollHeight: number,
    scrollWidth: number
  ) {
    if (this.scrollThrottle) {
      return;
    }

    this.scrollThrottle = window.setTimeout(() => {
      this.logEvent("scroll", { scrollX, scrollY, scrollHeight, scrollWidth });
      this.scrollThrottle = null;
    }, 200); // 200ms마다 최대 1회
  }

  /**
   * 키보드 이벤트 로깅
   */
  logKeyDown(
    key: string,
    code: string,
    ctrlKey: boolean,
    shiftKey: boolean,
    altKey: boolean
  ) {
    this.logEvent("keydown", { key, code, ctrlKey, shiftKey, altKey });
  }

  /**
   * 자동 플러시 시작
   */
  private startAutoFlush() {
    this.flushTimer = setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.flush();
      }
    }, this.flushInterval);
  }

  /**
   * 이벤트 큐를 DB에 저장 (배치 처리)
   * API를 통해 서버에 전송
   */
  async flush(): Promise<void> {
    if (this.eventQueue.length === 0) {
      return;
    }

    const eventsToSave = [...this.eventQueue];
    this.eventQueue = [];

    try {
      // API를 통해 배치로 저장
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          userId: this.userId,
          pagePath: this.currentPath,
          events: eventsToSave.map((e) => ({
            type: e.type,
            data: e.data,
            timestamp: e.timestamp.toISOString(),
          })),
          eventCount: eventsToSave.length,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Failed to save events";
        const errorDetails = errorData.details || "";

        // Prisma 마이그레이션이 필요한 경우 콘솔에 안내
        if (
          errorMessage.includes("schema not migrated") ||
          errorMessage.includes("does not exist")
        ) {
          console.warn(
            "⚠️ 이벤트 로깅을 사용하려면 Prisma 마이그레이션이 필요합니다:\n" +
              "   npx prisma migrate dev --name add_user_events"
          );
        }

        throw new Error(
          `${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`
        );
      }
    } catch (error) {
      // 네트워크 에러나 기타 에러는 조용히 처리 (사용자 경험 방해 안 함)
      if (process.env.NODE_ENV === "development") {
        console.error("이벤트 로깅 실패:", error);
      }
      // 실패한 이벤트는 다시 큐에 추가하지 않음 (무한 루프 방지)
      // 필요시 재시도 로직 추가 가능
    }
  }

  /**
   * 수동 플러시 및 정리
   */
  async destroy(): Promise<void> {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }

    // 남은 이벤트 플러시
    await this.flush();
  }
}

// ============================================
// 싱글톤 인스턴스
// ============================================

let eventLoggerInstance: EventLogger | null = null;

/**
 * 이벤트 로거 인스턴스 가져오기
 */
export function getEventLogger(): EventLogger {
  if (!eventLoggerInstance) {
    eventLoggerInstance = new EventLogger();
  }
  return eventLoggerInstance;
}

/**
 * 이벤트 로거 초기화 (클라이언트 사이드)
 */
export function initEventLogger(userId?: string) {
  if (typeof window === "undefined") {
    return;
  }

  const logger = getEventLogger();
  if (userId) {
    logger.setUserId(userId);
  }

  // 전역 이벤트 리스너 등록
  setupGlobalEventListeners(logger);
}

/**
 * 전역 이벤트 리스너 설정
 */
function setupGlobalEventListeners(logger: EventLogger) {
  if (typeof window === "undefined") {
    return;
  }

  // 마우스 이동
  window.addEventListener("mousemove", (e) => {
    logger.logMouseMove(
      e.clientX,
      e.clientY,
      (e.target as HTMLElement)?.tagName
    );
  });

  // 클릭
  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    logger.logClick(
      e.clientX,
      e.clientY,
      target?.tagName || undefined,
      target?.textContent?.substring(0, 50) || undefined,
      e.button
    );
  });

  // 스크롤
  window.addEventListener("scroll", () => {
    logger.logScroll(
      window.scrollX,
      window.scrollY,
      document.documentElement.scrollHeight,
      document.documentElement.scrollWidth
    );
  });

  // 키보드 (특정 키만)
  window.addEventListener("keydown", (e) => {
    // 중요한 키만 로깅 (예: Enter, Escape, Tab)
    if (["Enter", "Escape", "Tab", "ArrowUp", "ArrowDown"].includes(e.key)) {
      logger.logKeyDown(e.key, e.code, e.ctrlKey, e.shiftKey, e.altKey);
    }
  });

  // 페이지 변경 감지 (Next.js)
  if (typeof window !== "undefined") {
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      logger.updatePath(window.location.pathname);
      logger.flush(); // 페이지 변경 시 즉시 플러시
    };

    window.addEventListener("popstate", () => {
      logger.updatePath(window.location.pathname);
      logger.flush();
    });
  }

  // 페이지 언로드 시 플러시
  window.addEventListener("beforeunload", () => {
    logger.flush();
  });
}

/**
 * 이벤트 로거 정리
 */
export async function destroyEventLogger() {
  if (eventLoggerInstance) {
    await eventLoggerInstance.destroy();
    eventLoggerInstance = null;
  }
}
