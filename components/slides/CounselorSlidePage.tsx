"use client";

import { SlidePageProps } from "@/types/ui";
import SlidePage from "../SlidePage";

/**
 * 상담사용 슬라이드 페이지 컴포넌트
 * 상담사 전용 스타일과 기능을 제공하는 SlidePage
 */
export default function CounselorSlidePage({
  children,
  className = "",
  transform,
  zIndex,
  style,
  onGoBack,
  showBackButton = false,
  title = "상담 일정 보기",
  employeeName = "",
  employeeRole = "상담사",
  employeeId = "",
}: SlidePageProps) {
  return (
    <SlidePage
      className={`isCounselor ${className}`.trim()}
      transform={transform}
      zIndex={zIndex}
      style={style}
      onGoBack={onGoBack}
      showBackButton={showBackButton}
      title={title}
      employeeName={employeeName}
      employeeRole={employeeRole}
      showToggleSwitch={false}
    >
      {/* ============================================
          상담 일정 보기 Slide 내용 - 여기에 퍼블리싱
          (WeeklyCalendar는 자동 표시됨)
          ============================================ */}
      {children}
    </SlidePage>
  );
}

CounselorSlidePage.displayName = "CounselorSlidePage";
