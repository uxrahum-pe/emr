"use client";

import { SlidePageProps } from "@/types/ui";
import SlidePage from "../SlidePage";

/**
 * 원장용 슬라이드 페이지 컴포넌트
 * 원장 전용 스타일과 기능을 제공하는 SlidePage
 */
export default function DoctorSlidePage({
  children,
  className = "",
  transform,
  zIndex,
  style,
  onGoBack,
  showBackButton = false,
  title = "원장 일정 보기",
  employeeName = "",
  employeeRole = "원장",
  employeeId = "",
}: SlidePageProps) {
  return (
    <SlidePage
      className={`isDoctor ${className}`.trim()}
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
      {children}
    </SlidePage>
  );
}
