/**
 * SlidePage Component
 *
 * @description Aside 패널 내에서 슬라이드 애니메이션으로 표시되는 페이지 컨테이너입니다.
 * 뒤로 가기 버튼, 제목 헤더, 주간 달력 등의 공통 UI를 제공합니다.
 *
 * @component
 * @example
 * ```tsx
 * // 기본 슬라이드 페이지
 * <SlidePage
 *   title="고객 참조 사항"
 *   onGoBack={goBack}
 *   showBackButton={true}
 * >
 *   <CustomerReferenceContent />
 * </SlidePage>
 *
 * // 직원 일정 슬라이드
 * <SlidePage
 *   title="업무 일정 보기"
 *   employeeName="김유정"
 *   employeeRole="상담사"
 *   onGoBack={goBack}
 *   showBackButton={true}
 * />
 *
 * // 고객 상세 슬라이드
 * <SlidePage
 *   title="고객 상세"
 *   customerName="박지영"
 *   customerId="210048921"
 *   onGoBack={goBack}
 *   showBackButton={true}
 * >
 *   <CustomerDetailContent />
 * </SlidePage>
 * ```
 *
 * @remarks
 * - Aside 컴포넌트에서 자동으로 transform, zIndex props를 전달합니다.
 * - 직원 일정 보기(원장, 상담사 등)의 경우 WeeklyCalendar가 자동으로 표시됩니다.
 * - "내 쪽지 보기", "내 알림 보기"는 달력이 표시되지 않습니다.
 * - showBackButton이 true이고 customerName이 없으면 달력이 표시됩니다.
 *
 * @see Aside - 슬라이드 페이지 스택 관리 컴포넌트
 * @see SlidePageHeader - 슬라이드 페이지 헤더 컴포넌트
 * @see useAsideStore - Aside 상태 관리 스토어
 */

"use client";

import { SlidePageProps } from "@/types/ui";
import SlidePageHeader from "./SlidePageHeader";
import WeeklyCalendar from "./WeeklyCalendar";
import DoctorScheduleContent from "./slides/DoctorScheduleContent";
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
