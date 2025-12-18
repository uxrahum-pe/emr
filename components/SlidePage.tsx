"use client";

import { SlidePageProps } from "@/types/ui";
import SlidePageHeader from "./SlidePageHeader";
import WeeklyCalendar from "./WeeklyCalendar";

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
  const shouldShowCalendar = showBackButton && !customerName;

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
      {shouldShowCalendar && <div className="C166">{children}</div>}
      {!shouldShowCalendar && children}
    </div>
  );
}
