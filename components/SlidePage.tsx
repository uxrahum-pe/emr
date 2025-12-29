"use client";

import { SlidePageProps } from "@/types/ui";
import SlidePageHeader from "./SlidePageHeader";
import WeeklyCalendar from "./WeeklyCalendar";
import DoctorScheduleContent from "./slides/DoctorScheduleContent";

/**
 * 기본 슬라이드 페이지 컴포넌트
 * 공통 슬라이드 페이지 기능을 제공
 */
export default function SlidePage({
  children,
  className = "",
  transform,
  zIndex,
  style,
  onGoBack,
  showBackButton = false,
  title,
  employeeName,
  employeeRole,
  customerName,
  customerId,
  showToggleSwitch = true,
}: SlidePageProps) {
  const inlineStyle: React.CSSProperties = {
    ...(transform && { transform }),
    ...(zIndex !== undefined && { zIndex }),
    ...style,
  };

  // 업무 일정 보기, 원장 일정 보기, 상담 일정 보기일 때 WeeklyCalendar 표시
  // "내 쪽지 보기", "내 알림 보기"는 달력 표시 안 함
  const shouldShowCalendar =
    showBackButton &&
    !customerName &&
    title !== "내 쪽지 보기" &&
    title !== "내 알림 보기";

  return (
    <div className={`C073 ${className}`.trim()} style={inlineStyle}>
      {showBackButton && onGoBack && (
        <SlidePageHeader
          onGoBack={onGoBack}
          title={title || "고객 참조 사항"}
          employeeName={employeeName}
          employeeRole={employeeRole}
          customerName={customerName}
          customerId={customerId}
          showToggleSwitch={showToggleSwitch}
        />
      )}
      {shouldShowCalendar && <WeeklyCalendar isNotShadow={true} />}
      {shouldShowCalendar && title === "원장 일정 보기" && (
        <DoctorScheduleContent />
      )}
      {!shouldShowCalendar && children}
    </div>
  );
}
