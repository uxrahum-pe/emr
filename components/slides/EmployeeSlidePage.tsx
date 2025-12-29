"use client";

import { SlidePageProps } from "@/types/ui";
import SlidePage from "../SlidePage";

/**
 * 일반직원용 슬라이드 페이지 컴포넌트
 * 일반직원 전용 스타일과 기능을 제공하는 SlidePage
 */
export default function EmployeeSlidePage({
  children,
  className = "",
  transform,
  zIndex,
  style,
  onGoBack,
  showBackButton = false,
  title = "업무 일정 보기",
  employeeName = "",
  employeeRole = "",
  employeeId = "",
}: SlidePageProps) {
  // 역할에 따라 title 결정
  const getTitle = () => {
    if (title) return title;
    if (employeeRole.includes("상담사")) return "상담 일정 보기";
    if (employeeRole.includes("원장")) return "원장 일정 보기";
    return "업무 일정 보기";
  };

  return (
    <SlidePage
      className={`isEmployee ${className}`.trim()}
      transform={transform}
      zIndex={zIndex}
      style={style}
      onGoBack={onGoBack}
      showBackButton={showBackButton}
      title={getTitle()}
      employeeName={employeeName}
      employeeRole={employeeRole}
      showToggleSwitch={false}
    >
      {/* ============================================
          업무 일정 보기 / 상담 일정 보기 Slide 내용 - 여기에 퍼블리싱
          (WeeklyCalendar는 자동 표시됨)
          ============================================ */}
      {children}
    </SlidePage>
  );
}

EmployeeSlidePage.displayName = "EmployeeSlidePage";
